import PokemonSprite from "./PokemonSprite"
import Formulas from "./Formulas"

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
  experience
  isLoaded = false
  experienceMode = 'fast'
  static GENDER_MALE = 'male'
  static GENDER_FEMALE = 'female'
  static GENDER_GENDERLESS = 'genderless'

  constructor(species, level, gender, moves, experience = null, name = null){
    this.species = species
    this.name = name ? name : species.name
    this.level = level
    this.moves = moves
    this.gender = gender
    this.experience = experience
    return this.prepareToBattle()
  }

  async prepareToBattle(){
    this.calcStats()
    this.currentHp = this.stats.hp
    await this.setTypes()
    await this.setSprites()
    this.isLoaded = true

    if(!this.experience)
      this.experience = Formulas.calcTotalExperienceForLevel(this.level)

    return this
  }

  calcStats(){
    const level = this.level
    const baseStats = this.species.baseStats
    const stats = this.stats

    Object.keys(baseStats).forEach(stat =>
        stats[stat] = stat === 'hp' ?
          Formulas.calcMaxHp(baseStats[stat], level) :
          Formulas.calcStat(baseStats[stat], level)
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

    localStorage.setItem('experience', this.experience)

    if(this.experiencePercent >= 100)
      setTimeout(() => {
        this.level++
        localStorage.setItem('level', this.level)
      }, 600)
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
    return Formulas.calcTotalExperienceForLevel(this.level + 1)
  }

  get totalExperienceForCurrentLevel(){
    return Formulas.calcTotalExperienceForLevel(this.level)
  }

  get neededExperience(){
    return this.totalExperienceToNextLevel - this.totalExperienceForCurrentLevel
  }

  get currentExperience(){
    return this.experience - this.totalExperienceForCurrentLevel
  }

  get experiencePercent(){
    const {currentExperience, neededExperience} = this
    const percent =  Math.floor((currentExperience / neededExperience) * 100)

    return percent >= 100 ? 100 : percent
  }

}
