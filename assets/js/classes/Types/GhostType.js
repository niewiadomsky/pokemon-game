import Type from '../Type'
import Icon from 'pokemon-assets/assets/svg/types/ghost.svg'

export default class GhostType extends Type {
  constructor() {
    super('Ghost', 'ghost', Icon, {
      ghost: 2,
      psychic: 2,
      dark: 0.5,
      normal: 0,
    });
  }
}
