export default class PokemonSprite {
  #front
  #back

  constructor(front, back) {
    this.#front = front;
    this.#back = back;
  }

  get front() {
    return this.#front;
  }

  get back() {
    return this.#back;
  }
}
