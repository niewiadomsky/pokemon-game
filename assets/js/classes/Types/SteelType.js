import Type from '../Type'
import Icon from 'pokemon-assets/assets/svg/types/steel.svg'

export default class SteelType extends Type {
  constructor() {
    super('Steel', 'steel', Icon, {
      ice: 2,
      rock: 2,
      fairy: 2,
      fire: 0.5,
      water: 0.5,
      electric: 0.5,
      steel: 0.5,
    });
  }
}
