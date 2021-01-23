import { useEffect, useState, Component } from "react"
import PokemonSearchSection from "./components/pokemon-search"
import {
    PokemonInfoView,
    PokemonLoadingView,
    PokemonCard,
} from "./components/pokemon-data-view"
import axios from "axios"

class PokemonCardErrorBoundary extends Component {
    state = { error: null }

    static getDerivedStateFromError(error) {
        return { error }
    }

    render() {
        const { error } = this.state
        const { resetErrorBoundary, FallbackComponent } = this.props
        if (error) {
            return <FallbackComponent {...{ error, resetErrorBoundary }} />
        }

        return this.props.children
    }
}

function PokemonCardErrorFallback({ error, resetErrorBoundary }) {
    return (
        <div role="alert">
            <PokemonCard style={{ border: "1px dashed red", color: "red" }}>
                Something went wrong. <br />
                Luckily, it was caught (by PokemonCardErrorBoundary). <br />
                Anyway, here's the error message: <br />
                {error.message}
                <button onClick={resetErrorBoundary}>Try again</button>
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
        url: "https://graphql-pokemon2.vercel.app",
        method: "post",
        data: { query },
    }).then(result => {
        const pokemon = result.data.data.pokemon
        if (!pokemon) {
            return Promise.reject(new Error("pokemon doesn't exist"))
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
const PokemonApp = ({ pokemonName }) => {
    const [state, setState] = useState({
        status: pokemonName ? "pending" : "idle",
        pokemonData: null,
        error: null,
    })
    const { status, pokemonData, error } = state

    useEffect(() => {
        if (!pokemonName) {
            setState({ status: "idle" })
            return
        }

        setState({ status: "pending" })
        fetchPokemon(pokemonName).then(
            pokemonData => {
                setState({ status: "resolved", pokemonData })
            },
            error => {
                setState({ status: "rejected", error })
            }
        )
    }, [pokemonName])

    let card = null
    if (status === "idle") {
        card = (
            <PokemonCard style={{ border: "1px dashed yellow" }}>
                Please submit a pokemon!
            </PokemonCard>
        )
    } else if (status === "pending") {
        card = <PokemonLoadingView {...{ pokemonName }} />
    } else if (status === "rejected") {
        throw error
    } else if (status === "resolved") {
        card = <PokemonInfoView {...{ pokemonData }} />
    } else {
        throw new Error("This should be impossible")
    }

    return card
}

function App() {
    const [pokemonName, setPokemonName] = useState("")

    return (
        <>
            <PokemonSearchSection
                pokemonName={pokemonName}
                onSubmit={newPokemonName => setPokemonName(newPokemonName)}
            />
            <PokemonCardErrorBoundary
                resetErrorBoundary={() => setPokemonName("")}
                FallbackComponent={PokemonCardErrorFallback}
                key={pokemonName}
            >
                <PokemonApp pokemonName={pokemonName} />
            </PokemonCardErrorBoundary>
        </>
    )
}
export default App
