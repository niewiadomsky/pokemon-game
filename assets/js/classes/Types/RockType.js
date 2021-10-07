import Type from '../Type'
import Icon from 'pokemon-assets/assets/svg/types/rock.svg'

export default class RockType extends Type {
  constructor() {
    super('Rock', 'rock', Icon, {
      fire: 2,
      ice: 2,
      flying: 2,
      bug: 2,
      fighting: 0.5,
      ground: 0.5,
      steel: 0.5,
    });
  }
}
