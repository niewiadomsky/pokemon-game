import Type from '../Type'
import Icon from 'pokemon-assets/assets/svg/types/flying.svg'

export default class FlyingType extends Type {
  constructor() {
    super('Flying', 'flying', Icon, {
      grass: 2,
      fighting: 2,
      bug: 2,
      electric: 0.5,
      rock: 0.5,
      steel: 0.5,
    });
  }
}
