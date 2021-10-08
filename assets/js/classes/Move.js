export default class Move {
  name
  type
  category
  accuracy
  currentPp
  maxPp
  power
  priority
  highCriticalHitRatio
  effect

  static CATEGORY_SPECIAL = 'special'
  static CATEGORY_PHYSICAL = 'physical'
  static CATEGORY_STATUS = 'status'

  constructor({name, type, category, power, accuracy, pp, priority, highCriticalHitRatio, effect}){
    this.name = name
    this.type = type
    this.category = category
    this.accuracy = accuracy
    this.maxPp = pp
    this.currentPp = pp
    this.power = power
    this.priority = priority
    this.highCriticalHitRatio = highCriticalHitRatio
    this.effect = effect
  }
}
