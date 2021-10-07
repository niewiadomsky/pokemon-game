import Type from '../Type'
import Icon from 'pokemon-assets/assets/svg/types/water.svg'

export default class WaterType extends Type {
  constructor() {
    super('Water', 'water', Icon, {
      fire: 2,
      ground: 2,
      rock: 2,
      water: 0.5,
      grass: 0.5,
      dragon: 0.5,
    });
  }
}
