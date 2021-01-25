import { useState } from "react"
import PokemonSearchbar from "./components/pokemon-search"
import PokemonInfoCard from "./components/pokemon-info-card"
import { PokemonErrorView } from "./components/pokemon-data-view"
import CustomErrorBoundary from "./components/custom-error-boundary"

function App() {
    const [submittedName, setSubmittedName] = useState("")

    return (
        <>
            <PokemonSearchbar
                pokemonName={submittedName}
                onSubmit={name => setSubmittedName(name)}
            />
            <CustomErrorBoundary
                resetFunction={() => setSubmittedName("")}
                FallbackComponent={PokemonErrorView}
                key={submittedName}
            >
                <PokemonInfoCard pokemonName={submittedName} />
            </CustomErrorBoundary>
        </>
    )
}

export default App
