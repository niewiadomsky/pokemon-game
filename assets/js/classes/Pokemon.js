export default class Pokemon {
  #name
  #level
  #maxHp
  #currentHp
  #moves = []
  #spriteUrl
  #experience = 0
  #type

  //Todo abilities
  //Todo stats

  constructor(name, type, level, maxHp, moves, spriteUrl){
    this.#name = name
    this.#level = name
    this.#type = type
    this.#maxHp = maxHp
    this.#currentHp = maxHp
    this.#moves = moves
    this.#spriteUrl = spriteUrl

  }


  get currentHp() {
    return this.#currentHp;
  }

  get experience() {
    return this.#experience;
  }

  get name() {
    return this.#name;
  }

  get type() {
    return this.#type;
  }

  get level() {
    return this.#level;
  }

  get maxHp() {
    return this.#maxHp;
  }

  get moves() {
    return this.#moves;
  }

  get spriteUrl() {
    return this.#spriteUrl;
  }

  set currentHp(value) {
    this.#currentHp = value;
  }

  set experience(value) {
    this.#experience = value;
  }
}
