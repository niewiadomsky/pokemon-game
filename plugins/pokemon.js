import PokemonJson from 'pokemon-assets/assets/data/pokemon.json'
import MovesJson from '../assets/json/moves.json'
import Pokemon from "../assets/js/classes/Pokemon";
import Move from "../assets/js/classes/Move";

const pokemonApi = {
  pokemonJson: PokemonJson,
  movesJson: MovesJson,
  getPokemonInfo(name){
    console.log(name)
    name = name.replaceAll('-', '');
    const pokemon = this.pokemonJson[name]

    if(pokemon.prevo)
      pokemon.prevo = this.getPokemonInfo(pokemon.prevo.toLowerCase())

    return pokemon
  },
  getPokemonInfoByNum(num){
    return Object.values(this.pokemonJson).find(pokemon => pokemon.num === num)
  },
  createPokemon(species, level, gender, moves, name = null){
    try{
      return new Pokemon(this.getPokemonInfo(species), level, gender, moves, name)
    } catch (e) {
      console.log(`Not found pokemon: ${name}`, e)
    }
  },
  createRandomPokemon(minLevel = 15, maxLevel = 25) {
    const level = Math.floor(Math.random() * (maxLevel - minLevel) + minLevel)
    const maxNum = 151
    const num = Math.floor(Math.random() * (maxNum - 1) + 1)
    const species = this.getPokemonInfoByNum(num).alias
    const moves = this.createRandomMoves()
    const gender = Math.random() <= 0.5 ? 'male' : 'female'

    return this.createPokemon(species, level, gender, moves)
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
    try {
      return new Move(this.getMoveInfo(moveName))
    } catch(e) {
      console.log(`Not found move: ${moveName}`, e)
    }
  },
  createMoves(moves){
    return moves.map(move => this.createMove(move))
  },
  createRandomMoves(){
    const moves = this.movesJson.sort(() => Math.random() - Math.random()).slice(0, 4)

    return moves.map(move => this.createMove(move.name))
  }
}

export default ({ app }, inject) => {
  inject('pkm', pokemonApi)
}
