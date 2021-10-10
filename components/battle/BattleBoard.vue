<template>
  <div>
    <div class="battle-scene">
      <div v-if="opponent && opponent.isLoaded && myPokemon && myPokemon.isLoaded" class="battle-container">
        <HpBar class="hp-bar hp-bar--player" :showExperience="true" :showIndicator="true" :pokemon="myPokemon"></HpBar>
        <img class="pokemon-sprite pokemon-sprite--player" :src="myPokemon.sprite.back" :alt="myPokemon.name">

        <HpBar class="hp-bar hp-bar--opponent" :pokemon="opponent"></HpBar>
        <img class="pokemon-sprite pokemon-sprite--opponent" :src="opponent.sprite.front" :alt="opponent.name">
      </div>
    </div>
    <div class="battle-bottom" v-if="myPokemon && myPokemon.isLoaded">
      <BattleText></BattleText>
      <BattleMenu :pokemon="myPokemon"></BattleMenu>
    </div>
  </div>
</template>

<script>

export default {
  data: () => ({
    myPokemon: null,
    opponent: null,
  }),
  async mounted() {
    const opponentMoves = this.$pkm.createMoves(['flamethrower', 'scratch'])
    const myMoves = this.$pkm.createMoves(['body slam', 'rest', 'tackle', 'petal dance'])

    this.opponent = await this.$pkm.createPokemon('charizard', 20, 'male', opponentMoves)
    this.myPokemon = await this.$pkm.createPokemon('snorlax', 15, 'female', myMoves)
  }

}
</script>

<style lang="scss" scoped>
  .battle-scene {
    width: $battle-scene-width;
    height: $battle-scene-height;

    background-image: url("/images/battle_scene.jpg");
    background-size: contain;

    .battle-container {
      @apply relative h-full;

      .pokemon-sprite {
        @apply absolute w-52;

        &--player {
          bottom: -55px;
          left: 60px;
        }

        &--opponent {
          right: 100px;
          top: 40px;
        }
      }

      .hp-bar{
        @apply absolute z-10;

        &--player {
          bottom: 20px;
          right: 30px;
        }

        &--opponent {
          top: 20px;
          left: 20px;
        }
      }
    }
  }

  .battle-bottom {
    @apply px-0.5 py-1 relative;
    background: $border-color;
  }


</style>
