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
      <BattleText ref="battleText"></BattleText>
      <BattleMenu :pokemon="myPokemon" @message="onMenuMessage"></BattleMenu>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    myPokemon: null,
  }),
  async mounted() {
    const experience = localStorage.experience ? parseInt(localStorage.experience) : null
    const level = localStorage.level ? parseInt(localStorage.level) : 5

    const myMoves = this.$pkm.createMoves(['flamethrower', 'petal dance', 'fly', 'surf'])
    this.myPokemon = await this.$pkm.createPokemon('dragonite', level, 'female', myMoves, experience)

    const opponent = await this.$pkm.createRandomPokemon(9, 10)

    this.$battle.startBattle(this.myPokemon, opponent)
  },
  methods: {
    onMenuMessage(message){
      this.$refs.battleText.setText(message)
    }
  },
  computed: {
    opponent(){
      return this.$battle.opponent
    }
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
