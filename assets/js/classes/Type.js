export default class Type{
  name
  slug
  icon
  effectiveness

  constructor(name, slug, icon, effectiveness) {
    this.name = name
    this.slug = slug
    this.icon = icon
    this.effectiveness = effectiveness
  }

  //Todo fix effectiveness multipliers
  getMultiplierOfType(type) {
    const { effectiveness } = this
    const multiplier = type in effectiveness ? effectiveness[type] : 1

    return 1 / multiplier
  }
}
