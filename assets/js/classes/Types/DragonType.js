import Type from '../Type'
import Icon from 'pokemon-assets/assets/svg/types/dragon.svg'

export default class DragonType extends Type {
  constructor() {
    super('Dragon', 'dragon', Icon, {
      dragon: 2,
      steel: 0.5,
      fairy: 0,
    });
  }
}
