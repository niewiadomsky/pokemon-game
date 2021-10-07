import Type from '../Type'
import Icon from 'pokemon-assets/assets/svg/types/poison.svg'

export default class PoisonType extends Type {
  constructor() {
    super('Poison', 'poison', Icon, {
      grass: 2,
      fairy: 2,
      poison: 0.5,
      ground: 0.5,
      rock: 0.5,
      ghost: 0.5,
      steel: 0,
    });
  }
}
