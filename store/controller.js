export const state = () => ({
  options: [],
  currentOption: null,
  executedOption: null,
})

export const getters = {
  getCurrentOption: (state) => state.currentOption,
  getOptions: (state) => state.options,
  getExecutedOption: (state) => state.executedOption,
}

export const mutations = {
  SET_OPTIONS: (state, options) => state.options = options,
  SET_CURRENT_OPTION: (state, option) => state.currentOption = option,
  SET_EXECUTED_OPTION: (state, option) => state.executedOption = option,
}
