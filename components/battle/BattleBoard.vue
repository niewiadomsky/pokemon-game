<template>
  <div>
    <div class="battle-scene"></div>
    <div class="battle-bottom">
      <BattleText></BattleText>
      <BattleMenu></BattleMenu>
    </div>
  </div>
</template>

<script>

export default {
  data: () => ({
  }),
}
</script>

<style lang="scss">
  .battle-scene{
    width: 720px;
    height: 336px;

    background-image: url("/images/battle_scene.jpg");
    background-size: contain;
  }

  .battle-bottom{
    @apply px-0.5 py-1 relative;
    background: $border-color;
  }
</style>
