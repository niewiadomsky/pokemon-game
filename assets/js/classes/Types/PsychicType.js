import Type from '../Type'
import Icon from 'pokemon-assets/assets/svg/types/psychic.svg'

export default class PsychicType extends Type {
  constructor() {
    super('Psychic', 'psychic', Icon, {
      fighting: 2,
      poison: 2,
      psychic: 0.5,
      steel: 0.5,
      dark: 0,
    });
  }
}
