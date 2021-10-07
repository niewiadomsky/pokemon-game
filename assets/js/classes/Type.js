export default class Type{
  #name
  #slug
  #icon
  #effectiveness

  constructor(name, slug, icon, effectiveness) {
    this.#name = name
    this.#slug = slug
    this.#icon = icon
    this.#effectiveness = effectiveness
  }

  get name() {
    return this.#name
  }

  get icon() {
    return this.#icon
  }

  get effectiveness() {
    return this.#effectiveness
  }

  get slug() {
    return this.#slug
  }
}
