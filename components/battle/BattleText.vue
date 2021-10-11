<template>
  <div class="battle-text-container">
    <div>
      {{typedText}}
    </div>
  </div>
</template>

<script>
export default {
  computed: {

    typedText(){
      return this.$text.typedText;
    }
  },

}
</script>

<style lang="scss" scoped>
  .battle-text-container{
    @apply box-border rounded-lg py-3 px-5 text-2xl;

    height: 130px;
    background: $battle-text-background;
    color: $battle-text-color;
    border: 7px solid $battle-text-border-outer;
    box-shadow: 0 0 0 4px $battle-text-border-inner inset,
  }
</style>
