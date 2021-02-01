import { useEffect, useState } from "react"
import { PokemonInfoView, PokemonLoadingView, PokemonIdleView } from "./pokemon-data-view"
import { fetchPokemon } from "fetch-utils"
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
