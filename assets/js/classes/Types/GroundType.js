import Type from '../Type'
import Icon from 'pokemon-assets/assets/svg/types/ground.svg'

export default class GroundType extends Type {
  constructor() {
    super('Ground', 'ground', Icon, {
      fire: 2,
      electric: 2,
      poison: 2,
      rock: 2,
      steel: 2,
      grass: 0.5,
      bug: 0.5,
      flying: 0
    });
  }
}
