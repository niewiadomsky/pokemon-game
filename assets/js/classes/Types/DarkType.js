import Type from '../Type'
import Icon from 'pokemon-assets/assets/svg/types/dark.svg'

export default class DarkType extends Type {
  constructor() {
    super('Dark', 'dark', Icon, {
      psychic: 2,
      ghost: 2,
      fighting: 0.5,
      dark: 0.5,
      fairy: 0.5,
    });
  }
}
