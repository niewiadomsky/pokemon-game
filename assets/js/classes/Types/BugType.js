import Type from '../Type'
import Icon from 'pokemon-assets/assets/svg/types/bug.svg'

export default class BugType extends Type {
  constructor() {
    super('Bug', 'bug', Icon, {
      grass: 2,
      psychic: 2,
      dark: 2,
      fire: 0.5,
      fighting: 0.5,
      poison: 0.5,
      flying: 0.5,
      ghost: 0.5,
      steel: 0.5,
      fairy: 0.5,
    });
  }
}
