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
    console.log(experience)
    return this.prepareToBattle()
  }

  async prepareToBattle(){
    this.stats = Formulas.calcStats(this)
    this.currentHp = this.stats.hp
    await this.setTypes()
    await this.setSprites()
    this.isLoaded = true

    if(!this.experience)
      this.experience = Formulas.calcTotalExperienceForLevel(this.level)

    return this
  }

  levelUp(){
    this.level++
    localStorage.setItem('level', this.level)

    const beforeLevelUpStats = {...this.stats}
    this.stats = Formulas.calcStats(this)
    const diffStats = Formulas.diffStats(beforeLevelUpStats, this.stats)

    console.log(diffStats)
    this.currentHp += diffStats.hp


    if(this.totalExperienceToNextLevel <= this.experience)
      this.levelUp()
  }

  takeDamage(damage){
    const remainingHp = this.currentHp - damage

    this.currentHp = remainingHp <= 0 ? 0 : remainingHp

    return this.isDead
  }

  heal(){
    this.currentHp = this.stats.hp
  }

  gainExperience(experience){
    this.experience += experience

    localStorage.setItem('experience', this.experience)

    if(this.experiencePercent >= 100)
      setTimeout(this.levelUp.bind(this), 600)
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
