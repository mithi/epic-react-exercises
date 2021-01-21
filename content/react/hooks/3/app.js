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
            return { data: result.data.data.pokemon, error: null }
        })
        .catch(error => {
            return { data: null, error }
        })
}

const useFetchPokemon = () => {
    const [pokemonData, setPokemonData] = useState(null)
    const [pokemonName, fetchPokemonName] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(false)

    useEffect(() => {
        setIsError(false)
        setIsLoading(true)
        fetchPokemon(pokemonName).then(result => {
            if (result.error) {
                setIsError(true)
                setIsLoading(false)
                setPokemonData(null)
            }

            setIsLoading(false)
            setIsError(false)
            setPokemonData(result.data)
        })
    }, [pokemonName])

    return [{ pokemonData, isLoading, isError }, fetchPokemonName]
}

const App = () => {
    const [{ pokemonData }, fetchPokemonName] = useFetchPokemon()

    useEffect(() => {
        fetchPokemonName("pikachu")
    }, [])

    return (
        <>
            <PokemonSearchSection />
            <PokemonDataView {...{ pokemonData }} />
        </>
    )
}

export default App
