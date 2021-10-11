import Vue from "vue"
import TextManager from "../assets/js/classes/TextManager"

export default ({ app }, inject) => {
  inject('text', Vue.observable(new TextManager()))
}
