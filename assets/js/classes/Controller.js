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

  constructor($store) {
    this.$store = $store
    this.collideEffect = new Audio(collideSound)
    this.selectEffect = new Audio(selectSound)

    window.addEventListener('keydown', this.onKeyDown.bind(this))

    //Prevent blur
    window.addEventListener('mousedown', (e) => {
      e.preventDefault()
      e.stopPropagation()
    })
  }

  onKeyDown({key, altKey, ctrlKey, shiftKey}){
    console.log(key, altKey, ctrlKey, shiftKey)
    const assignedKey = this.keyMap.find(assignedKey => assignedKey.key === key)

    if(!assignedKey) {
      return console.log('Not found key: ', key)
    }

    console.log(assignedKey)

    const methodName = assignedKey.callback ? assignedKey.callback : assignedKey.action

    if(this[methodName])
      this[methodName]()
  }

  executeOption(){
    if(this.currentOption.callback)
      this.currentOption.callback()
  }

  revertExecutionOption(){
    if(this.currentOption.revertCallback)
      this.currentOption.revertCallback()
  }

  left() {
    try {
      const currentIndex = this.getCurrentIndex()
      let newIndex;
      newIndex = currentIndex - 1

      this.selectOption(newIndex)
    } catch(e) {
      this.collideEffect.play()

    }

  }
  right(){
    try{
      const currentIndex = this.getCurrentIndex()
      const newIndex = currentIndex + 1

      this.selectOption(newIndex)
    } catch(e){
      this.collideEffect.play()
    }

  }

  getCurrentIndex(){
    console.log(this.currentOption)
    return this.options.findIndex(option => option.ref === this.currentOption.ref)
  }

  getLastIndex(){
    return this.options.length ? this.options.length - 1 : null
  }

  setOptions(options) {
    this.$store.commit('controller/SET_OPTIONS', options)
    console.log(options)
    this.selectOption(0, false)
  }

  selectOption(index, sound = true){
    const option = this.options[index]
    console.log(option, this.options)
    option.ref.focus()
    this.$store.commit('controller/SET_CURRENT_OPTION', option)

    if(sound)
      this.selectEffect.play()
  }

  get options(){
    return this.$store.getters['controller/getOptions']
  }

  get currentOption(){
    return this.$store.getters['controller/getCurrentOption']
  }

}
