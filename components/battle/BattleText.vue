<template>
  <div class="battle-text-container">
    <div>
      {{typedText}}
    </div>
  </div>
</template>

<script>
import {mapGetters, mapMutations} from 'vuex'

export default {
  data: () => ({
    typedText: '',
    defaultText: 'What will you do?',
    text: '',
    charIndex: 0,
    typingSpeed: 50,
  }),
  computed: {
    ...mapGetters({
      messages: 'battleText/getMessages',
      isTyping: 'battleText/isTyping',
      isWaiting: 'battleText/isWaiting',
    })
  },
  methods: {
    ...mapMutations({
      setMessages: 'battleText/SET_MESSAGES',
      setWaitingState: 'battleText/SET_WAITING_STATE',
      setTypingState: 'battleText/SET_TYPING_STATE',
    }),
    async typeText(resolve, instant = false){
      const {text, typingSpeed, typeText} = this

      if(instant)
        return this.typedText = text

      if(this.charIndex < text.length) {
        if(!this.isTyping)
          this.setTypingState(true)

        this.typedText += text.charAt(this.charIndex)
        this.charIndex++
        setTimeout(() => typeText(resolve), typingSpeed)

      } else {
        setTimeout(() => {
          this.setTypingState(false)
          this.setText(this.defaultText, true)
          resolve(true)
        }, 500)
      }
    },
    setText(text, instant = false){
      this.charIndex = 0
      this.typedText = ''
      this.text = text

      return new Promise((resolve, reject) => {
        return this.typeText(resolve, instant)
      })

    }
  },
  mounted(){
    this.setText(this.defaultText, true)
  },
  watch: {
    messages: {
      deep: true,
      async handler(){
        for(const message of this.messages) {
          await this.setText(message)
        }
        this.$controller.selectOption(0)
      }
    }
  }

}
</script>

<style lang="scss" scoped>
  .battle-text-container{
    @apply box-border rounded-lg py-3 px-5 text-2xl;

    height: 130px;
    background: $battle-text-background;
    color: $battle-text-color;
    border: 7px solid $battle-text-border-outer;
    box-shadow: 0 0 0 4px $battle-text-border-inner inset,
  }
</style>
