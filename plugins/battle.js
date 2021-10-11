import Vue from 'vue'
import Battle from "../assets/js/classes/Battle"

export default ({ app, store, $pkm, $text }, inject) => {
  inject('battle', Vue.observable(new Battle(store, $pkm, $text)))
}
