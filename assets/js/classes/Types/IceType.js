import Type from '../Type'
import Icon from 'pokemon-assets/assets/svg/types/ice.svg'

export default class IceType extends Type {
  constructor() {
    super('Ice', 'ice', Icon, {
      grass: 2,
      ground: 2,
      flying: 2,
      dragon: 2,
      fire: 0.5,
      water: 0.5,
      ice: 0.5,
      steel: 0.5,
    });
  }
}
