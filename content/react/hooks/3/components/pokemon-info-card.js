import { useEffect, useState } from "react"
import { useStickyState } from "hooks"
import { PokemonInfoView, PokemonLoadingView, PokemonIdleView } from "./pokemon-data-view"
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

/*
state:
    idle: no request made yet
    pending: request started
    resolved: request successful
    rejected: request failed
 */
const PokemonInfoCard = ({ pokemonName }) => {
    const [state, setState] = useState({
        status: pokemonName ? "pending" : "idle",
        pokemonData: null,
        error: null,
    })

    useEffect(() => {
        if (!pokemonName) {
            setState({ status: "idle" })
            return
        }

        setState({ status: "pending" })
        fetchPokemon(pokemonName).then(
            pokemonData => setState({ status: "resolved", pokemonData }),
            error => setState({ status: "rejected", error })
        )
    }, [pokemonName])

    const { status, pokemonData, error } = state

    if (status === "resolved") {
        return <PokemonInfoView {...{ pokemonData }} />
    } else if (status === "idle") {
        return <PokemonIdleView />
    } else if (status === "pending") {
        return <PokemonLoadingView {...{ pokemonName }} />
    } else if (status === "rejected") {
        throw error
    }

    throw new Error("This should be impossible")
}

export default PokemonInfoCard
