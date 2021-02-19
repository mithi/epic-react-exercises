import { useState } from "react"
import PokemonInfoCard from "./components/pokemon-info-card"
import { PokemonErrorView } from "./components/pokemon-data-view"
import CustomErrorBoundary from "./components/custom-error-boundary"
import { OnClickText, PrettyInputField, SmallSpan } from "components/pretty-defaults"
import { SingleFieldForm, FormSubmit, FormBottom } from "components/single-field-form"

const PokemonSuggestion = ({ name, buttonSubmit }) => {
    return <OnClickText onClick={() => buttonSubmit(name)}>{name}</OnClickText>
}

function App() {
    const [submittedValue, onSubmit] = useState("")
    const [incompleteValue, setIncompleteValue] = useState("")

    const resetFunction = () => {
        setIncompleteValue("")
        onSubmit("")
    }

    function buttonSubmit(value) {
        setIncompleteValue(value)
        onSubmit(value)
    }

    const suggestPikachu = <PokemonSuggestion {...{ name: "Pikachu", buttonSubmit }} />
    const suggestNineTales = (
        <PokemonSuggestion {...{ name: "Ninetales", buttonSubmit }} />
    )
    const suggestCharizard = (
        <PokemonSuggestion {...{ name: "Charizard", buttonSubmit }} />
    )

    return (
        <>
            <SingleFieldForm
                onSubmit={buttonSubmit}
                setValue={setIncompleteValue}
                value={incompleteValue}
            >
                <PrettyInputField placeholder="Which pokemon?" />
                <FormSubmit>Fetch!</FormSubmit>
                <FormBottom>
                    <SmallSpan>
                        Out of ideas? Try {suggestPikachu}, {suggestCharizard} or{" "}
                        {suggestNineTales}.
                    </SmallSpan>
                </FormBottom>
            </SingleFieldForm>
            <CustomErrorBoundary
                FallbackComponent={PokemonErrorView}
                {...{ resetFunction, key: submittedValue }}
            >
                <PokemonInfoCard pokemonName={submittedValue} />
            </CustomErrorBoundary>
        </>
    )
}

export default App
