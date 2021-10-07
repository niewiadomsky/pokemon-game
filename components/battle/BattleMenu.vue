<template>
  <div v-if="!isDisabled" class="absolute right-0 top-0 h-full py-1 px-0.5">
    <div class="battle-menu">
      <div class="battle-menu__option" v-for="option in options" :key="option" @click="functionHandler(`choice${option}`)">
        <button class="battle-menu__option-text">{{option}}</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isDisabled: {
      type: Boolean,
      default: false,
    }
  },
  data: () => ({
    options: ['Fight', 'Pokemon', 'Bag', 'Run']
  }),
  methods: {
    choiceFight(){
      console.log('fight')
      return true
    },
    choicePokemon(){
      console.log('pokemon')

      return true
    },
    choiceBag(){
      console.log('bag')

      return true
    },
    choiceRun(){
      console.log('run')

      return true
    },
    functionHandler(functionName){
      this[functionName]();
    }
  }
}
</script>

<style lang="scss" scoped>
  .battle-menu {
    @apply rounded-md p-3 h-full flex flex-wrap;
    width: 300px;
    background: $battle-menu-background;
    border: 4px solid $battle-menu-border;
    color: $battle-menu-color;

    &__option {
      @apply w-1/2 cursor-pointer flex items-center;

      &:nth-child(odd) {
        @apply pl-4;
      }

      &-text {
        @apply text-3xl pl-5 relative inline-block uppercase;

        &::before {
          @apply absolute rounded -left-1 top-1/2 transform -translate-y-1/2 hidden;

          content: '';
          border-left: 12px solid $battle-menu-color;
          border-top: 12px solid transparent;
          border-bottom: 12px solid transparent;
        }

        &:hover, &:focus{
          @apply outline-none;

          &::before {
            @apply block;
          }
        }
      }
    }
  }
</style>
