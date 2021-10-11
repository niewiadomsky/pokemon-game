export default class Battle {
  round = 0
  ai
  player
  isFighting = false
  $store
  $pkm
  $text

  constructor($store, $pkm, $text) {
    this.$store = $store
    this.$pkm = $pkm
    this.$text = $text
  }

  startBattle(player, ai) {
    this.round = 0
    this.player = player
    this.ai = ai
    this.isFighting = true
    this.$text.setDefault()
  }

  nextRound(callback) {
    if(!this.isFighting) return

    callback()
    this.round++
  }

  async useMove(move, isPlayer) {
    const {ai, player,} = this
    const attacker = isPlayer ? player : ai
    const defender = isPlayer ? ai: player

    const {damage, effectivenessMessage} = this.calcDamage(move, attacker, defender)

    const isDead = defender.takeDamage(damage)
    await this.$text.setText(`${!isPlayer ? 'Wild ' : ''}${attacker.name.toUpperCase()} used ${move.name.toUpperCase()}!`)

    if(effectivenessMessage)
      await this.$text.setText(effectivenessMessage)

    if(isDead) {
      await this.$text.setText(`${!isPlayer ? 'Wild ' : ''}${defender.name.toUpperCase()} fainted!`)
    }
    await this.endBattle(true)
    return isDead
  }

  async endBattle(refight= false){
    this.isFighting = false

    if(refight) {
      const ai  = await this.$pkm.createRandomPokemon(15, 25)
      this.startBattle(this.player, ai)
    }
    console.log('Battle Ended')
  }

  calcDamage(move, attacker, defender) {
    if(move.category !== 'special' && move.category !== 'physical' || !move.power) {
      console.log('Cant calculate damage', move)
      return 0
    }

    const levelMultiplier = this.calcLevelMultiplier(attacker)
    const atkDefRatio = this.calcAtkDefRatio(move, attacker, defender)
    const STAB = this.calcSTABMultiplier(move, attacker)
    const randomMultiplier = this.calcRandomDamageMultiplier()
    const typeEffectivenessMultiplier = this.calcTypeEffectivenessMultiplier(move, defender)
    const effectivenessMessage = this.getMessageByTypeEffectiveness(typeEffectivenessMultiplier)

    console.log({levelMultiplier, STAB, randomMultiplier, typeEffectivenessMultiplier, atkDefRatio})

    const damage =  Math.ceil(((levelMultiplier * move.power * atkDefRatio / 50) + 2) * STAB * randomMultiplier * typeEffectivenessMultiplier)
    return {damage, effectivenessMessage}
  }

  calcRandomDamageMultiplier() {
    const min = 0.85
    const max = 1

    return parseFloat((Math.random() * (max - min) + min).toFixed(2))
  }

  calcSTABMultiplier({type: moveType}, {types: pokemonTypes}) {
    return pokemonTypes.find(pokemonType => pokemonType.name.toLowerCase() === moveType) ? 1.5 : 1
  }

  calcTypeEffectivenessMultiplier({type: moveType}, {types: pokemonTypes}) {
    return pokemonTypes.reduce((total, pokemonType) => {
      return total * pokemonType.getMultiplierOfType(moveType.toLowerCase());
    }, 1)
  }

  calcAtkDefRatio({category}, {stats: {atk, spa}}, {stats: {def, spd}}) {
    let ratio = 0

    if(category === 'physical')
      ratio = atk / def

    if(category === 'special')
      ratio = spa / spd

    return parseFloat(ratio.toFixed(2))
  }

  calcLevelMultiplier({level}) {
    return  (2 * level) / 5 + 2
  }

  getMessageByTypeEffectiveness(multiplier) {
    const messages = {
      '2': `It's super effective!`,
      '0.5': `It's not very effective!`,
      '4': `It's super super effective!`,
    }

    return multiplier in messages ? messages[multiplier] : null
  }

  get opponent(){
    return this.ai
  }

}
