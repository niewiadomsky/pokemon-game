import Controller from "../assets/js/classes/Controller";

export default ({ app, store, $text }, inject) => {

  inject('controller', new Controller(store, $text))
}
