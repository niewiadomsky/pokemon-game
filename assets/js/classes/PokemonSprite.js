export default class PokemonSprite {
  front
  back
  isShiny
  num
  isLoaded = false

  constructor(num, isShiny) {
    this.num = num
    this.isShiny = isShiny
    this.setSprites()
  }

  async setSprites(){
    try {
      this.front = (await this.importSprite('front')).default
      this.back = (await this.importSprite('back')).default
      this.isLoaded = true
    } catch (e) {
      console.log('Not found sprites', e)
    }
  }

  importSprite(sidePath){
    const {num, isShiny} = this
    const shinyPath = isShiny ? 'shiny/' : ''

    return import('./../../sprites/' + sidePath + '/' + shinyPath + num + '.png')
  }

}
