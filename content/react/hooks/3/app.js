import { useState } from "react"
import PokemonSearchbar from "./components/pokemon-search"
import PokemonInfoCard from "./components/pokemon-info-card"
import { PokemonErrorView } from "./components/pokemon-data-view"
import CustomErrorBoundary from "./components/custom-error-boundary"

function App() {
    const [submittedName, setSubmittedName] = useState("")
    const [incompleteName, setIncompleteName] = useState("")

    const resetFunction = () => {
        setIncompleteName("")
        setSubmittedName("")
    }

    return (
        <>
            <PokemonSearchbar
                pokemonName={submittedName}
                onSubmit={name => setSubmittedName(name)}
                {...{ incompleteName, setIncompleteName }}
            />
            <CustomErrorBoundary
                FallbackComponent={PokemonErrorView}
                {...{ resetFunction, key: submittedName }}
            >
                <PokemonInfoCard pokemonName={submittedName} />
            </CustomErrorBoundary>
        </>
    )
}

export default App
