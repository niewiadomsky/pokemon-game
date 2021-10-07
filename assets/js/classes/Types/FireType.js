import Type from '../Type'
import Icon from 'pokemon-assets/assets/svg/types/fire.svg'

export default class FireType extends Type {
  constructor() {
    super('Fire', 'fire', Icon, {
      grass: 2,
      ice: 2,
      bug: 2,
      steel: 2,
      fire: 0.5,
      water: 0.5,
      rock: 0.5,
      dragon: 0.5
    });
  }
}
