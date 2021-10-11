<template>
  <div class="bar-rounded bar-back" :class="showExperience ? 'experience' : 'default'">
    <div class="bar-rounded bar-wrapper">
      <div class="bar-info">
      <span class="bar-info__name">
        {{pokemon.name}}
        <img class="bar-info__gender" v-if="genderIcon" :src="genderIcon" alt="">
      </span>
        <div class="bar-info__level">
          Lv{{pokemon.level}}
        </div>
      </div>
      <div class="hp-bar">
        <div class="hp-bar__wrapper">
          <div class="hp-bar__label">HP</div>
          <div class="hp-bar__bar">
            <div class="hp-bar__bar--fill" :class="barClass" :style="{width: `${Math.ceil(hpPercent)}%`}"></div>
          </div>
        </div>
        <div v-if="showIndicator" class="hp-bar__indicator">
          {{pokemon.currentHp}}/ {{pokemon.stats.hp}}
        </div>
        <div v-if="showExperience" class="hp-bar__experience">
          <div class="hp-bar__experience-label">EXP</div>
          <div class="hp-bar__experience-bar">
            <div class="hp-bar__experience-bar--fill" :style="{width: `${Math.floor(expPercent)}%`}"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MaleIcon from 'pokemon-assets/assets/svg/gender-male.svg'
import FemaleIcon from 'pokemon-assets/assets/svg/gender-female.svg'

export default {
  props: {
    pokemon: {
      type: Object,
      required: true
    },
    showIndicator: {
      type: Boolean,
      default: false,
    },
    showExperience: {
      type: Boolean,
      default: false,
    }
  },
  computed: {
    genderIcon(){
      if(this.pokemon.gender === 'male')
        return MaleIcon
      if(this.pokemon.gender === 'female')
        return FemaleIcon

      return false
    },
    hpPercent(){
      const {currentHp, stats: {hp: maxHp}} = this.pokemon
      const percent = (currentHp / maxHp) * 100
      return percent < 0 ? 0 : percent
    },
    expPercent(){
      return this.pokemon.experiencePercent
    },
    barClass(){
      if(this.hpPercent < 20)
        return 'low'
      if(this.hpPercent < 50)
        return 'medium'

      return 'high'
    }
  }
}
</script>

<style lang="scss" scoped>
  .bar-rounded {
    border-top-right-radius: $hp-bar-rounded--smaller;
    border-top-left-radius: $hp-bar-rounded--bigger;
    border-bottom-left-radius: $hp-bar-rounded--smaller;
    border-bottom-right-radius: $hp-bar-rounded--bigger;
  }

  .bar-back {
    $bg-color: rgba($hp-bar-backface-color, .95);
    @apply p-0.5 relative;
    background: $bg-color;

    &::after {
      @apply absolute;
      z-index: -1;
      content: '';
    }

    &.default::after {
      top: 76%;
      left: 20px;
      width: 102%;
      border-bottom-left-radius: 20px;
      border-right: 35px solid transparent;
      border-bottom: 35px solid $bg-color;
    }

    &.experience::after {
      top: 62%;
      right: -10px;
      width: 110%;
      border-bottom-right-radius: 30px;
      border-left: 50px solid transparent;
      border-bottom: 60px solid $bg-color;
    }
  }

  .bar-wrapper {
    border: $hp-bar-border-width solid $hp-bar-border;
    background: $hp-bar-background;
    width: $hp-bar-width;
    min-height: 85px;
    color: $hp-bar-color;

    .bar-info {
      @apply flex justify-between items-center pl-4 pr-2 font-bold tracking-wide text-3xl;

      &__name {
        @apply uppercase flex;
      }

      &__gender {
        @apply w-6;
      }
    }

    .hp-bar {
      @apply flex flex-col items-end px-1;

      &__wrapper {
        @apply flex rounded-2xl;
        background: $hp-bar-backface-color;
      }

      &__label {
        @apply flex items-center text-yellow-400 font-bold uppercase tracking-wider text-2xl sm:leading-6 ml-3;
      }

      &__bar {
        @apply my-0.5 mr-0.5 rounded-2xl;
        width: $hp-bar-inner-width;
        border: 3px solid $hp-bar-inner-border;

        &--fill {
          @apply h-full rounded-2xl;

          transition: width .4s ease-out;

          &.high {
            background: $hp-bar-inner-fill--green;
          }
          &.medium {
            background: $hp-bar-inner-fill--yellow;
          }
          &.low {
            background: $hp-bar-inner-fill--red;
          }
        }
      }

      &__indicator {
        @apply font-bold text-3xl tracking-wider pr-2;
      }

      &__experience {
        @apply absolute flex items-center;
        bottom: -20px;
        right: 20px;

        &-label {
          @apply text-yellow-300 mr-1 font-bold tracking-wider;
        }

        &-bar{
          @apply h-1;
          background: $hp-bar-experience-color;
          width: $hp-bar-experience-width;

          &--fill {
            @apply h-full;
            transition: width .4s ease-out;
            background: $hp-bar-experience-color--fill;
          }
        }
      }
    }
  }
</style>
