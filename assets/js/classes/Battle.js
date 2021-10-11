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

  async fightRound(playerMove) {
    const {ai, player} = this
    const aiMove = this.getAiRandomMove()
    const isPlayerMoveFirst = this.isPlayerMoveFirst(playerMove, player, aiMove, ai)

    const attacker = isPlayerMoveFirst ? player : ai
    const defender = !isPlayerMoveFirst ? player : ai
    const move = isPlayerMoveFirst ? playerMove : aiMove
    const secondMove = !isPlayerMoveFirst ? playerMove : aiMove

    let isDead = await this.useMove(move, attacker, defender)

    if(isDead)
      return this.endBattle(attacker, defender)

    isDead = await this.useMove(secondMove, defender, attacker)

    if(isDead)
      return this.endBattle(defender, attacker)

    return false
  }

  async useMove(move, attacker, defender) {
    const {damage, effectivenessMessage} = this.calcDamage(move, attacker, defender)

    const isDead = defender.takeDamage(damage)
    await this.$text.setText(`${this.isAiPokemon(attacker) ? 'Wild ' : ''}${attacker.name.toUpperCase()} used ${move.name.toUpperCase()}!`)

    if(effectivenessMessage)
      await this.$text.setText(effectivenessMessage)

    if(isDead) {
      await this.$text.setText(`${this.isAiPokemon(defender) ? 'Wild ' : ''}${defender.name.toUpperCase()} fainted!`)
    }

    return isDead
  }

  isPlayerMoveFirst(
    {priority: playerPriority = 0},
    {stats: {spd: playerSpeed}},
    {priority: aiPriority = 0},
    {stats: {spd: aiSpeed}}) {

    const priority = playerPriority - aiPriority
    const speed = playerSpeed - aiSpeed

    return (priority === 0 ? speed : priority) >= 0
  }

  isPlayerPokemon(pokemon){
    return this.player === pokemon
  }

  isAiPokemon(pokemon){
    return this.ai === pokemon
  }

  getAiRandomMove(){
    return this.ai.moves.sort(() => Math.random() - Math.random())[0]
  }

  async endBattle(winner, loser){
    this.isFighting = false
    const isPlayerPokemon = this.isPlayerPokemon(winner)

    // await this.$text.setText(`${isPlayerPokemon ? 'Wild ' : ''}${winner.name} is the Winner!`)

    if(isPlayerPokemon) {
      const experience = this.calcExperience(loser)
      await this.$text.setText(`${winner.name} gain ${experience} exp!`)
      winner.gainExperience(experience)

      const ai  = await this.$pkm.createRandomPokemon(30, 40)
      this.startBattle(this.player, ai)

    } else {
      this.player.heal()
    }

    console.log('Battle Ended')
    return winner
  }

  calcDamage(move, attacker, defender) {
    if(move.category !== 'special' && move.category !== 'physical' || !move.power) {
      console.log('Cant calculate damage', move)
      return {damage: 0}
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
      return total * pokemonType.getMultiplierOfType(moveType.toLowerCase())
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

  calcExperience({level, evoGrade}){
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
