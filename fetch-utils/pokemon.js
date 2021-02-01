import axios from "axios"

const fetchPokemon = async pokemonName => {
    let query = `
    query PokemonInfo($name: String = "${pokemonName}") {
        pokemon(name: $name) {
            number
            name
            image
            attacks {
                special {
                    name
                    type
                    damage
                }
            }
        }
    }
`
    return axios({
        url: "https://graphql-pokemon2.vercel.app",
        method: "post",
        data: { query },
    }).then(result => {
        const pokemon = result.data.data.pokemon
        if (!pokemon) {
            return Promise.reject(
                new Error(`The pokemon "${pokemonName}" is not in the database.`)
            )
        }
        const abilities = pokemon.attacks.special
        const name = pokemon.name
        const number = pokemon.number
        const imageUrl = pokemon.image
        return { name, number, imageUrl, abilities }
    })
}

export default fetchPokemon
