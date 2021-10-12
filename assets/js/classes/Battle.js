import Messages from "./Messages"
import Formulas from "./Formulas"

export default class Battle {
  round = 0
  ai
  player
  isFighting = false
  $pkm
  $text

  constructor($pkm, $text) {
    this.$pkm = $pkm
    this.$text = $text
  }

  startBattle(player, ai) {
    this.round = 0
    this.player = player
    this.player.isPlayer = true
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
    const isPlayerMoveFirst = Formulas.isPlayerMoveFirst(playerMove, player, aiMove, ai)

    const firstPokemon = isPlayerMoveFirst ?
      {attacker: player, defender: ai, move: playerMove, secondMove: aiMove} :
      {attacker: ai, defender: player, move: aiMove, secondMove: playerMove}

    const fighters = [firstPokemon, this.reverseFighters(firstPokemon)]

    for(const {attacker, defender, move} of fighters){

      let isDead = await this.useMove(move, attacker, defender)

      if(isDead)
        return await this.endBattle(attacker, defender)
    }

    return false
  }

  async useMove(move, attacker, defender) {
    const {damage, typeEffectivenessMultiplier} = Formulas.calcDamage(move, attacker, defender)

    const isDead = defender.takeDamage(damage)
    await this.$text.setText(Messages.useMove(attacker, move))

    const effectivenessMessage = Messages.moveEffectiveness(typeEffectivenessMultiplier)
    if(effectivenessMessage)
      await this.$text.setText(effectivenessMessage)

    if(isDead) {
      await this.$text.setText(Messages.pokemonFainted(defender))
    }

    return isDead
  }

  reverseFighters({attacker, defender, move, secondMove}){
    return {attacker: defender, defender: attacker, move: secondMove, secondMove: move}
  }

  getAiRandomMove(){
    return this.ai.moves.sort(() => Math.random() - Math.random())[0]
  }

  async endBattle(winner, loser){
    this.isFighting = false

    if(winner.isPlayer) {
      const experience = Formulas.calcExperience(loser)
      await this.$text.setText(Messages.gainExperience(winner, experience))
      winner.gainExperience(experience)

      const ai  = await this.$pkm.createRandomPokemon(30, 40)
      this.startBattle(this.player, ai)

    } else {
      this.isFighting = true
      this.player.heal()
    }

    console.log('Battle Ended')
    return winner
  }

  get opponent(){
    return this.ai
  }

}
