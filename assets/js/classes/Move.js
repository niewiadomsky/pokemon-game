export default class Move {
  #name
  #type
  #category
  #accuracy
  #pp
  #power

  constructor(name, type, category, accuracy, pp, power){
    this.#name = name
    this.#type = type
    this.#category = category
    this.#accuracy = accuracy
    this.#pp = pp
    this.#power = power
  }

  get name() {
    return this.#name;
  }

  get type() {
    return this.#type;
  }

  get category() {
    return this.#category;
  }

  get accuracy() {
    return this.#accuracy;
  }

  get pp() {
    return this.#pp;
  }

  get power() {
    return this.#power;
  }

  set pp(value) {
    this.#pp = value;
  }
}
