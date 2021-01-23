import { useState } from "react"
import PokemonSearchSection from "./components/pokemon-search"
import PokemonInfoCard from "./components/pokemon-info-card"
import { PokemonErrorView } from "./components/pokemon-data-view"
import CustomErrorBoundary from "./components/custom-error-boundary"

function App() {
    const [pokemonName, setPokemonName] = useState("")

    return (
        <>
            <PokemonSearchSection
                pokemonName={pokemonName}
                onSubmit={newPokemonName => setPokemonName(newPokemonName)}
            />
            <CustomErrorBoundary
                resetErrorBoundary={() => setPokemonName("")}
                FallbackComponent={PokemonErrorView}
                key={pokemonName}
            >
                <PokemonInfoCard pokemonName={pokemonName} />
            </CustomErrorBoundary>
        </>
    )
}
export default App
