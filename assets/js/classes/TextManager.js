export default class TextManager {
  typedText = ''
  defaultText = 'What will you do?'
  text = ''
  charIndex = 0
  typingSpeed = 50
  isTyping = false
  multiplier = 1

  async typeText(resolve, instant = false){
    const {text, typingSpeed, multiplier} = this

    if(instant) {
      resolve(true)
      return this.typedText = text
    }

    if(this.charIndex < text.length) {
      if(!this.isTyping)
        this.isTyping = true

      this.typedText += text.charAt(this.charIndex)
      this.charIndex++
      setTimeout(() => this.typeText(resolve), typingSpeed / multiplier)

    } else {
      setTimeout(() => {
        this.isTyping = false
        this.setText(this.defaultText, true)
        resolve(true)
      }, 500)
    }
  }

  setText(text, instant = false){
    this.charIndex = 0
    this.typedText = ''
    this.text = text

    return new Promise((resolve, reject) => {
      return this.typeText(resolve, instant)
    })

  }

  setDefault(){
    this.setText(this.defaultText, true)
  }
}
