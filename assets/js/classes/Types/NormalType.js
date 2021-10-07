import Type from '../Type'
import Icon from 'pokemon-assets/assets/svg/types/normal.svg'

export default class NormalType extends Type {
  constructor() {
    super('Normal', 'normal', Icon, {
      rock: 0.5,
      steel: 0.5,
      ghost: 0,
    });
  }
}
