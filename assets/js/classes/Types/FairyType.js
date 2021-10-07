import Type from '../Type'
import Icon from 'pokemon-assets/assets/svg/types/fairy.svg'

export default class FairyType extends Type {
  constructor() {
    super('Fairy', 'fairy', Icon, {
      fighting: 2,
      dragon: 2,
      dark: 2,
      fire: 0.5,
      poison: 0.5,
      steel: 0.5,
    });
  }
}
