import collideSound from 'pokemon-assets/assets/audio/sfx/collide.wav'
import selectSound from 'pokemon-assets/assets/audio/sfx/select.wav'

export default class Controller {
  keyMap = [
    { action: 'select', key: 'z', callback: 'executeOption' },
    { action: 'back', key: 'x', callback: 'revertExecutionOption'},
    { action: 'up', key: 'ArrowUp' },
    { action: 'down', key: 'ArrowDown' },
    { action: 'left', key: 'ArrowLeft' },
    { action: 'right', key: 'ArrowRight' },
    { action: 'menu', key: 'enter' },
  ]
  rowLength = 2

  constructor($store) {
    this.$store = $store
    this.selectSound = new Audio(selectSound)
    this.collideSound = new Audio(collideSound)

    window.addEventListener('keydown', this.onKeyDown.bind(this))

    //Prevent blur
    window.addEventListener('mousedown', (e) => {
      e.preventDefault()
      e.stopPropagation()
    })
  }

  onKeyDown({key, altKey, ctrlKey, shiftKey}){
    if(this.isDisabled) return

    const assignedKey = this.keyMap.find(assignedKey => assignedKey.key === key)

    if(!assignedKey) {
      return console.log('Not found key: ', key)
    }

    const methodName = assignedKey.callback ? assignedKey.callback : assignedKey.action

    if(this[methodName])
      this[methodName]()
  }

  executeOption(){
    if(this.currentOption.callback) {
      this.currentOption.callback()
      this.$store.commit('controller/SET_EXECUTED_OPTION', this.currentOption)
      this.playSelectSound()
    }
  }

  revertExecutionOption(){
    if(this.executedOption && this.executedOption.revertCallback) {
      this.executedOption.revertCallback()
      this.resetExecutedOption()
      this.playSelectSound()
    }
  }

  left() {
    this.move((currentIndex) => {
      const index = currentIndex - 1
      return index % this.rowLength === 0 ? index : -1
    })
  }
  right() {
    this.move((currentIndex) => {
      const index = currentIndex + 1
      return index % this.rowLength !== 0 ? index : -1
    })
  }
  up() {
    this.move((currentIndex) => currentIndex - 2)
  }
  down() {
    this.move((currentIndex) => currentIndex + 2)
  }

  move(callback){
    try{
      const currentIndex = this.getCurrentIndex()
      const newIndex = callback(currentIndex)

      this.selectOption(newIndex)
    } catch(e){
      this.playCollideSound()
    }
  }

  getCurrentIndex(){
    return this.options.findIndex(option => option.ref === this.currentOption.ref)
  }

  getLastIndex(){
    return this.options.length ? this.options.length - 1 : null
  }

  setOptions(options, category) {
    this.$store.commit('controller/SET_OPTIONS', options)
    this.$store.commit('controller/SET_CATEGORY', category)
    this.selectOption(0, false)
  }

  selectOption(index, sound = true){
    const option = this.options[index]
    option.ref.focus()
    this.$store.commit('controller/SET_CURRENT_OPTION', option)

    if(sound)
      this.playSelectSound()
  }

  playSelectSound(){
    this.selectSound.currentTime = 0
    this.selectSound.play()
  }

  playCollideSound(){
    this.collideSound.currentTime = 0
    this.collideSound.play()
  }

  resetExecutedOption(){
    this.$store.commit('controller/SET_EXECUTED_OPTION', null)
  }

  get options(){
    return this.$store.getters['controller/getOptions']
  }

  get currentOption(){
    return this.$store.getters['controller/getCurrentOption']
  }

  get executedOption(){
    return this.$store.getters['controller/getExecutedOption']
  }

  get category(){
    return this.$store.getters['controller/getCategory']
  }

  get isDisabled(){
    return this.$store.getters['battleText/isTyping']
  }

}
