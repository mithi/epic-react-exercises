import { useEffect, useState } from "react"
import PokemonSearchSection from "./components/pokemon-search"
import PokemonDataView from "./components/pokemon-data-view"
import axios from "axios"
// useFetchPokemon
// PokemonDataView
// NoPokemonView
// PokemonInfoSection
// PokemonSearchSection

const fetchPokemon = name => {
    let query = `
    query PokemonInfo($name: String = "${name}") {
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
        url: "https://graphql-pokemon2.vercel.app/",
        method: "post",
        data: { query },
    })
        .then(result => {
            return { data: result.data, error: null }
        })
        .catch(error => {
            return { data: null, error }
        })
}

const App = () => {
    let [pokemonData, setPokemonData] = useState(null)

    useEffect(() => {
        fetchPokemon("pikachu").then(result => setPokemonData(result.data.data.pokemon))
    }, [])

    return (
        <>
            <PokemonSearchSection />
            <PokemonDataView {...{ pokemonData }} />
        </>
    )
}

export default App
