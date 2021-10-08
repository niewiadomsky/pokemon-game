import PokemonJson from 'pokemon-assets/assets/data/pokemon.json'
import MovesJson from '../assets/json/moves.json'
import Pokemon from "../assets/js/classes/Pokemon";
import Move from "../assets/js/classes/Move";

const pokemonApi = {
  pokemonJson: PokemonJson,
  movesJson: MovesJson,
  getPokemonInfo(name){
    return this.pokemonJson[name]
  },
  createPokemon(species, level, gender, moves, name = null){
    return new Pokemon(this.getPokemonInfo(species), level, gender, moves, name)
  },
  getMoveInfo(name) {
    return this.movesJson.find(move => move.name.toLowerCase() === name.toLowerCase())
  },
  getMoveOfType(type) {
    return this.movesJson.filter(move => move.type.toLowerCase() === type.toLowerCase())
  },
  getMoveOfCategory(category) {
    return this.movesJson.filter(move => move.category.toLowerCase() === category.toLowerCase())
  },
  getMovesInfo(moves) {
    return this.movesJson.filter(moveJson => moves.some(move => move.toLowerCase() === moveJson.name.toLowerCase()))
  },
  createMove(moveName) {
    return new Move(this.getMoveInfo(moveName))
  },
  createMoves(moves){
    return moves.map(move => this.createMove(move))
  }
}

export default ({ app }, inject) => {
  inject('pkm', pokemonApi)
}
