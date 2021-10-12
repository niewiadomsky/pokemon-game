import Vue from 'vue'
import Battle from "../assets/js/classes/Battle"

export default ({ app, $pkm, $text }, inject) => {
  inject('battle', Vue.observable(new Battle($pkm, $text)))
}
