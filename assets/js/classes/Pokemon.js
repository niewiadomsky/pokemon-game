export default class Pokemon {
  #name
  #level
  #maxHp
  #currentHp
  #moves = []
  #sprite
  #experience = 0
  #type
  #gender

  //Todo abilities
  //Todo stats

  constructor(name, type, level, maxHp, moves, sprite, gender){
    this.#name = name
    this.#level = name
    this.#type = type
    this.#maxHp = maxHp
    this.#currentHp = maxHp
    this.#moves = moves
    this.#sprite = sprite
    this.#gender = gender

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

  get gender() {
    return this.#gender;
  }

  get sprite() {
    return this.#sprite;
  }

  set currentHp(value) {
    this.#currentHp = value;
  }

  set experience(value) {
    this.#experience = value;
  }
}
