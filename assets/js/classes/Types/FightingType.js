import Type from '../Type'
import Icon from 'pokemon-assets/assets/svg/types/fighting.svg'

export default class FightingType extends Type {
  constructor() {
    super('Fighting', 'fighting', Icon, {
      normal: 2,
      ice: 2,
      rock: 2,
      dark: 2,
      steel: 2,
      poison: 0.5,
      flying: 0.5,
      psychic: 0.5,
      bug: 0.5,
      fairy: 0.5,
      ghost: 0,
    });
  }
}
