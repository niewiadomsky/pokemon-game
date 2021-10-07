import Type from '../Type'
import Icon from 'pokemon-assets/assets/svg/types/grass.svg'

export default class GrassType extends Type {
  constructor() {
    super('Grass', 'grass', Icon, {
      water: 2,
      ground: 2,
      rock: 2,
      fire: 0.5,
      grass: 0.5,
      poison: 0.5,
      flying: 0.5,
      bug: 0.5,
      dragon: 0.5,
      steel: 0.5,
    });
  }
}
