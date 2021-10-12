const uc = (name) => name.toUpperCase()

export default class Messages {
  static isWild(isWild){
    return isWild ? 'Wild ' : '';
  }

  static useMove({name: pokemonName, isPlayer}, {name: moveName}){
    return `${Messages.isWild(!isPlayer)}${uc(pokemonName)} used ${uc(moveName)}!`
  }

  static pokemonFainted({name, isPlayer}){
    return`${Messages.isWild(!isPlayer)}${uc(name)} fainted!`
  }

  static moveEffectiveness(multiplier){
    const messages = {
      '2': `It's super effective!`,
      '0.5': `It's not very effective!`,
      '4': `It's super super effective!`,
    }

    return multiplier in messages ? messages[multiplier] : null
  }

  static gainExperience({name}, experience){
    return `${uc(name)} gain ${experience} EXP. Points!`
  }
}
