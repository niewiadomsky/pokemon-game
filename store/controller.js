export const state = () => ({
  options: [],
  currentOption: null,
})

export const getters = {
  getCurrentOption: (state) => state.currentOption,
  getOptions: (state) => state.options
}

export const mutations = {
  SET_OPTIONS: (state, options) => state.options = options,
  SET_CURRENT_OPTION: (state, option) => state.currentOption = option,
}
