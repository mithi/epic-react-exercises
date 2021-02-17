import { useState } from "react"
import PokemonInfoCard from "./components/pokemon-info-card"
import { PokemonErrorView } from "./components/pokemon-data-view"
import CustomErrorBoundary from "./components/custom-error-boundary"
import { OnClickText, PrettyInputField, SmallSpan } from "components/pretty-defaults"
import { SingleFieldForm, FormSubmit, FormTop } from "components/single-field-form"

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

    return (
        <>
            <SingleFieldForm {...{ setIncompleteValue, incompleteValue, onSubmit }}>
                <FormTop>
                    <SmallSpan>
                        Out of ideas? Try{" "}
                        <PokemonSuggestion {...{ name: "Pikachu", buttonSubmit }} />,{" "}
                        <PokemonSuggestion {...{ name: "Charizard", buttonSubmit }} />, or{" "}
                        <PokemonSuggestion {...{ name: "Ninetales", buttonSubmit }} />
                    </SmallSpan>
                </FormTop>
                <PrettyInputField placeholder="Which pokemon?" />
                <FormSubmit>Fetch!</FormSubmit>
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
