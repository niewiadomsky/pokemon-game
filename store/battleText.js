export const state = () => ({
  messages: [],
  isTyping: false,
  isWaiting: false
})

export const getters = {
  getMessages: state => state.messages,
  isTyping: state => state.isTyping,
  isWaiting: state => state.isWaiting,
}

export const mutations = {
  SET_MESSAGES: (state, messages) => state.messages = messages,
  SET_TYPING_STATE: (state, boolean) => state.isTyping = boolean,
  SET_WAITING_STATE: (state, boolean) => state.isWaiting = boolean,
}
