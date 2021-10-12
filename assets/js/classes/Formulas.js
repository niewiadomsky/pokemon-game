export default class Formulas {
  /*
  * Pokemon formulas
  */

  static calcMaxHp(base, level){
    return Math.floor(0.01 * 2 * base * level) + level + 10
  }

  static calcStat(base, level){
    return Math.floor(0.01 * 2 * base * level) + 5
  }

  static calcTotalExperienceForLevel(level, mode = 'fast'){
    const modes = {
      fast: n => (Math.pow(n, 3) * 4) / 5,
      mediumFast: n => Math.pow(n, 3),
      mediumSlow: n => (6/5) * Math.pow(n, 3) - 15 * n * n + 100 * n - 140,
      slow: n => 5 * (Math.pow(n, 3)) / 5,
    }

    return mode in modes ? Math.floor(modes[mode](level)) : 0
  }

  /*
  * Battle formulas
  */
  static calcDamage(move, attacker, defender) {
    if(move.category !== 'special' && move.category !== 'physical' || !move.power) {
      console.log('Cant calculate damage', move)
      return {damage: 0}
    }

    const levelMultiplier = Formulas.calcLevelMultiplier(attacker)
    const atkDefRatio = Formulas.calcAtkDefRatio(move, attacker, defender)
    const STAB = Formulas.calcSTABMultiplier(move, attacker)
    const randomMultiplier = Formulas.calcRandomDamageMultiplier()
    const typeEffectivenessMultiplier = Formulas.calcTypeEffectivenessMultiplier(move, defender)

    const damage =  Math.ceil(((levelMultiplier * move.power * atkDefRatio / 50) + 2) * STAB * randomMultiplier * typeEffectivenessMultiplier)

    console.log({damage, levelMultiplier, STAB, randomMultiplier, typeEffectivenessMultiplier, atkDefRatio})
    return {damage, levelMultiplier, STAB, randomMultiplier, typeEffectivenessMultiplier, atkDefRatio}
  }

  static calcRandomDamageMultiplier() {
    const min = 0.85
    const max = 1

    return parseFloat((Math.random() * (max - min) + min).toFixed(2))
  }

  static calcSTABMultiplier({type: moveType}, {types: pokemonTypes}) {
    return pokemonTypes.find(pokemonType => pokemonType.name.toLowerCase() === moveType) ? 1.5 : 1
  }

  static calcTypeEffectivenessMultiplier({type: moveType}, {types: pokemonTypes}) {
    return pokemonTypes.reduce((total, pokemonType) => {
      return total * pokemonType.getMultiplierOfType(moveType.toLowerCase())
    }, 1)
  }

  static calcAtkDefRatio({category}, {stats: {atk, spa}}, {stats: {def, spd}}) {
    let ratio = 0

    if(category === 'physical')
      ratio = atk / def

    if(category === 'special')
      ratio = spa / spd

    return parseFloat(ratio.toFixed(2))
  }

  static calcLevelMultiplier({level}) {
    return  (2 * level) / 5 + 2
  }

  static calcExperience({level, evoGrade}){
    const evoRanges = [
      {min: 50, max: 90},
      {min: 91, max: 180},
      {min: 181, max: 250},
    ]
    const calcRandomExp = ({min, max}) => Math.floor(Math.random() * (max - min + 1)) + min
    const participatedPokemons = 1
    const isTrainerMultiplier = 1
    const baseExp = calcRandomExp(evoRanges[evoGrade - 1])
    const multiplier = 3

    return Math.ceil((level * isTrainerMultiplier * baseExp) / (7 * participatedPokemons)) * multiplier
  }

  static isPlayerMoveFirst(
    {priority: playerPriority = 0},
    {stats: {spd: playerSpeed}},
    {priority: aiPriority = 0},
    {stats: {spd: aiSpeed}}) {

    const priority = playerPriority - aiPriority
    const speed = playerSpeed - aiSpeed

    return (priority === 0 ? speed : priority) >= 0
  }
}
