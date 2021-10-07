import Type from '../Type'
import Icon from 'pokemon-assets/assets/svg/types/electric.svg'

export default class ElectricType extends Type {
  constructor() {
    super('Electric', 'electric', Icon, {
      water: 2,
      flying: 2,
      electric: 0.5,
      grass: 0.5,
      dragon: 0.5,
      ground: 0,
    });
  }
}
