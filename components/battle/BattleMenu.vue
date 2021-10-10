<template>
  <div v-if="!isDisabled" v-show="!isTyping" class="battle-menu__wrapper">
    <div v-if="selectingMove" class="battle-menu battle-menu--fight">
      <div class="battle-menu__option" v-for="option in pokemon.moves" :key="option.name">
        <button class="battle-menu__option-text" :ref="option.name">{{option.name}}</button>
      </div>
      <div class="battle-menu__option" v-for="missingMove in missingMoves">
        <button class="battle-menu__option-text">{{missingMove}}</button>
      </div>
    </div>
    <div class="battle-menu">
      <template v-if="!selectingMove">
        <div class="battle-menu__option" v-for="option in options" :key="option">
          <button class="battle-menu__option-text" :ref="option">{{option}}</button>
        </div>
      </template>
      <div v-if="selectedMove">
        <div class="move-pp">
          <span class="move-pp__label">PP</span>
          <span class="move-pp__value">{{selectedMove.currentPp}}/{{selectedMove.maxPp}}</span>
        </div>
        <div class="move-type">
          <span class="move-type__label">Typ/</span>
          <span class="move-type__value">{{capitalize(selectedMove.type)}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {capitalize} from "../../Utils/helpers"
import {mapGetters} from 'vuex'

export default {
  props: {
    pokemon: {
      type: Object,
      required: true,
    },
    isDisabled: {
      type: Boolean,
      default: false,
    }
  },
  data: () => ({
    options: ['fight', 'bag', 'pokemon', 'run'],
    selectingMove: false,
    opponentIsDead: false,
  }),
  methods: {
    capitalize,
    choiceFight(){
      this.selectingMove = true
      this.$nextTick(() => this.setMovesOptionsInController())
    },
    revertChoiceFight(){
      this.selectingMove = false
      this.$nextTick(() => this.setMenuOptionsInController())

    },
    useMove(move){
      this.$battle.nextRound(async() => {
        this.opponentIsDead = this.$battle.useMove(move, true)

        this.revertChoiceFight()
      })
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
    setMenuOptionsInController(){
      const options = this.options.map(option => {
        const callbackName = `choice${capitalize(option)}`
        const revertCallbackName = `revertChoice${capitalize(option)}`

        const callback = this[callbackName] ? this[callbackName].bind(this) : null
        const revertCallback = this[revertCallbackName] ? this[revertCallbackName].bind(this) : null
        const ref = this.$refs[option][0]

        return {option, callback, revertCallback, ref}
      })

      this.$controller.setOptions(options, 'menu')

    },
    setMovesOptionsInController(){
      const options = this.pokemon.moves.map(option => {
        const callback = this.useMove.bind(this, option)
        const ref = this.$refs[option.name][0]

        return {option, callback, ref}

      })

      this.$controller.setOptions(options, 'moves')

    }
  },
  computed: {
    ...mapGetters({
      'isTyping': 'battleText/isTyping'
    }),
    missingMoves(){
      const length = this.pokemon.moves.length
      if(length >= 4)
        return []
      const missingCount = 4 - length

      return new Array(missingCount).fill('-')
    },
    selectedMove(){
      if(this.$controller.category !== 'moves')
        return false

      return this.$controller.currentOption.option
    }
  },
  mounted() {
    this.setMenuOptionsInController()
  },
  watch: {
    isTyping(){
      if(!this.isTyping && this.opponentIsDead) {
        this.$battle.endBattle(true)
        this.opponentIsDead = false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .battle-menu {
    &__wrapper{
      @apply absolute right-0 top-0 h-full py-1 px-0.5 flex;
      background: $border-color;
    }

    @apply rounded-md p-3 h-full flex flex-wrap;
    width: 300px;
    background: $battle-menu-background;
    border: 4px solid $battle-menu-border;
    color: $battle-menu-color;

    &__option {
      @apply w-1/2 pl-4 cursor-default flex items-center;

      &:nth-child(odd) {
        @apply pl-5;
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

        &:focus {
          @apply outline-none;

          &::before {
            @apply block;
          }
        }
      }
    }
    &--fight {
      @apply mr-1;
      width: $battle-scene-width - 300px - 8px;
    }

    .move-pp, .move-type {
      @apply flex justify-between items-stretch py-1 uppercase;
      width: 270px;
      &__label {
        @apply text-3xl;
      }

      &__value {
        @apply text-4xl;
      }
    }

    .move-type {
      @apply text-gray-600;
    }
  }
</style>
