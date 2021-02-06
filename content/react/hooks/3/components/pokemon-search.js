import { DefaultButton } from "components/button"
import { OnClickText, PrettyInputField } from "components/pretty-defaults"

const PokemonSuggestion = ({ name, buttonSubmit }) => {
    return <OnClickText onClick={() => buttonSubmit(name)}>{name}</OnClickText>
}

const PokemonSearchSection = ({ onSubmit, setIncompleteName, incompleteName }) => {
    function handleSubmit(e) {
        e.preventDefault()
        onSubmit(incompleteName)
    }

    function buttonSubmit(name) {
        setIncompleteName(name)
        onSubmit(name)
    }

    return (
        <>
            <p style={{ fontSize: "12px" }}>
                Out of ideas? Try{" "}
                <PokemonSuggestion {...{ name: "Pikachu", buttonSubmit }} />,{" "}
                <PokemonSuggestion {...{ name: "Charizard", buttonSubmit }} />, or{" "}
                <PokemonSuggestion {...{ name: "Ninetales", buttonSubmit }} />
            </p>
            <form style={{ display: "flex" }} onSubmit={handleSubmit}>
                <PrettyInputField
                    style={{ width: "68%" }}
                    onChange={e => setIncompleteName(e.target.value)}
                    placeholder="Which pokemon?"
                    value={incompleteName}
                />
                <DefaultButton disabled={!incompleteName.length} type="submit">
                    Fetch!
                </DefaultButton>
            </form>
        </>
    )
}

export default PokemonSearchSection
