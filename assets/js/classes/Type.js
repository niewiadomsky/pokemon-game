export default class Type{
  #name
  #iconUrl
  #effectiveness = []

  constructor(name, iconUrl, effectiveness) {
    this.#name = name
    this.#iconUrl = iconUrl
    this.#effectiveness = effectiveness
  }

  get name() {
    return this.#name;
  }

  get iconUrl() {
    return this.#iconUrl;
  }

  get effectiveness() {
    return this.#effectiveness;
  }
}
