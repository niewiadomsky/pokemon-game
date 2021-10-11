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
  experienceMode = 'fast'
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

  heal(){
    this.currentHp = this.stats.hp
  }

  gainExperience(experience){
    this.experience += experience
  }

  getTotalExperienceForLevel(level){
    const {experienceMode} = this

    const modes = {
      fast: n => (Math.pow(n, 3) * 4) / 5,
      mediumFast: n => Math.pow(n, 3),
      mediumSlow: n => (6/5) * Math.pow(n, 3) - 15 * n * n + 100 * n - 140,
      slow: n => 5 * (Math.pow(n, 3)) / 5,
    }

    return experienceMode in modes ? Math.floor(modes[this.experienceMode](level)) : null
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

  get evoGrade(){
    const {prevo} = this.species

    if(!prevo)
      return 1


    if(prevo && !prevo.prevo)
      return 2

    return 3

  }

  get isDead(){
    return this.currentHp <= 0
  }

  get totalExperienceToNextLevel(){
    return this.getTotalExperienceForLevel(this.level + 1)
  }

  get neededExperience(){
    return this.totalExperienceToNextLevel - this.getTotalExperienceForLevel(this.level)
  }

  get experiencePercent(){
    const {experience, neededExperience} = this
    return Math.floor((experience / neededExperience) * 100)
  }

}
