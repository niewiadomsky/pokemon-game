import PokemonSprite from "./PokemonSprite";

export default class Pokemon {
  species
  name
  level
  currentHp
  moves
  gender
  types
  stats = {
    hp: null,
    atk: null,
    def: null,
    spa: null,
    spd: null,
    spe: null,
  }
  isShiny = false
  sprite
  experience = 0
  isLoaded = false

  static GENDER_MALE = 'male'
  static GENDER_FEMALE = 'female'
  static GENDER_GENDERLESS = 'genderless'

  constructor(species, level, gender, moves, name = null){
    this.species = species
    this.name = name ? name : species.name
    this.level = level
    this.moves = moves
    this.gender = gender
    return this.prepareToBattle()
  }

  calcMaxHp(base, level){
    return Math.floor(0.01 * 2 * base * level) + level + 10
  }

  calcStat(base, level){
    return Math.floor(0.01 * 2 * base * level) + 5
  }

  calcStats(){
    const level = this.level
    const baseStats = this.species.baseStats
    const stats = this.stats

    Object.keys(baseStats).forEach(stat =>
        stats[stat] = stat === 'hp' ?
          this.calcMaxHp(baseStats[stat], level) :
          this.calcStat(baseStats[stat], level)
      )
  }

  takeDamage(damage){
    const remainingHp = this.currentHp - damage

    if(remainingHp <= 0)
      this.currentHp = 0
    else
      this.currentHp = remainingHp

    return this.isDead
  }

  async setTypes(){
    const typeNames = this.species.types

    const types = await typeNames.map(async typeName => {
        const {default: Type} = await import(`./Types/${typeName}Type`)
        return new Type
      })

    this.types = await Promise.all(types)
  }

  async setSprites(){
    const num = this.species.num
    const isShiny = this.isShiny

    this.sprite = await new PokemonSprite(num, isShiny)
  }

  async prepareToBattle(){
    this.calcStats()
    this.currentHp = this.stats.hp
    await this.setTypes()
    await this.setSprites()
    this.isLoaded = true

    return this
  }

  get isDead(){
    return this.currentHp <= 0
  }
}
