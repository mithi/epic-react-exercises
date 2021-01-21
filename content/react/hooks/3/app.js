import { useEffect, useState, useCallback, Component } from "react"
import PokemonSearchSection from "./components/pokemon-search"
import {
    PokemonInfoView,
    PokemonLoadingView,
    PokemonCard,
} from "./components/pokemon-data-view"
import axios from "axios"
// useFetchPokemon
// PokemonDataView
// NoPokemonView
// PokemonInfoSection
// PokemonSearchSection

class ErrorBoundary extends Component {
    state = { error: null }
    static getDerivedStateFromError(error) {
        return { error }
    }
    render() {
        const { error } = this.state
        if (error) {
            console.log(error)
            return <this.props.FallbackComponent error={error} />
        }

        return this.props.children
    }
}

function ErrorFallback({ error }) {
    return (
        <div role="alert">
            <PokemonCard style={{ border: "3px solid red" }}>
                fallback: {error.message}
            </PokemonCard>
        </div>
    )
}

const fetchPokemon = async name => {
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
            const pokemon = result.data.data.pokemon
            if (!pokemon) {
                return { data: null, error: new Error("pokemon doesn't exist") }
            }
            const abilities = pokemon.attacks.special
            const name = pokemon.name
            const number = pokemon.number
            const imageUrl = pokemon.image
            return { data: { name, number, imageUrl, abilities }, error: null }
        })
        .catch(error => {
            return { data: null, error }
        })
}

/*

state:
    idle: no request made yet
    pending: request started
    resolved: request successful
    rejected: request failed
 */
const useFetchPokemon = () => {
    const [state, setState] = useState({
        status: "idle",
        pokemonData: null,
        error: null,
    })

    const [pokemonName, fetchPokemonName] = useState(null)

    useEffect(() => {
        setState({ status: "pending", error: null, pokemonData: null })

        fetchPokemon(pokemonName).then(result => {
            if (result.error) {
                setState({ status: "rejected", error: result.error, pokemonData: null })
            } else if (!result.data) {
                setState({ status: "pending", error: null, pokemonData: null })
            } else {
                setState({ status: "resolved", error: null, pokemonData: result.data })
            }
        })
    }, [pokemonName])

    const { pokemonData, status, error } = state
    return [{ pokemonData, status, error }, fetchPokemonName]
}

const PokemonApp = () => {
    const [{ pokemonData, status, error }, fetchPokemonName] = useFetchPokemon()

    const onSubmit = useCallback(pokemonName => fetchPokemonName(pokemonName), [])

    let card = null

    if (error) {
        card = (
            <PokemonCard style={{ border: "3px solid red" }}>
                Error: {error.message}
            </PokemonCard>
        )
    } else {
        try {
            if (status === "resolved") {
                card = <PokemonInfoView {...{ pokemonData }} />
            } else if (status === "pending") {
                card = <PokemonLoadingView />
            } else if (status === "idle") {
                card = (
                    <PokemonCard style={{ border: "3px solid yellow" }}>
                        Please submit a pokemon
                    </PokemonCard>
                )
            } else if (status === "") {
                throw new Error("This should be impossible")
            }
        } catch (error) {
            console.log("ERROR", error)
            card = (
                <PokemonCard style={{ border: "3px solid red" }}>
                    Error: {error.message}
                </PokemonCard>
            )
        }
    }

    return (
        <>
            <PokemonSearchSection {...{ onSubmit }} />
            {card}
        </>
    )
}
const App = () => {
    return (
        <ErrorBoundary FallbackComponent={ErrorFallback}>
            <PokemonApp />
        </ErrorBoundary>
    )
}

export default App
