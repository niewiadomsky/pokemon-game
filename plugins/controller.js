import Controller from "../assets/js/classes/Controller";

export default ({ app, store }, inject) => {

  inject('controller', new Controller(store))
}
