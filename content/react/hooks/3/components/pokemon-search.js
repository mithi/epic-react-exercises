import { DefaultButton } from "components/button"
import { OnClickText, PrettyInputField, SmallSpan } from "components/pretty-defaults"

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
            <SmallSpan>
                Out of ideas? Try{" "}
                <PokemonSuggestion {...{ name: "Pikachu", buttonSubmit }} />,{" "}
                <PokemonSuggestion {...{ name: "Charizard", buttonSubmit }} />, or{" "}
                <PokemonSuggestion {...{ name: "Ninetales", buttonSubmit }} />
            </SmallSpan>
            <form
                style={{
                    display: "flex",
                }}
                onSubmit={handleSubmit}
            >
                <PrettyInputField
                    style={{ flex: 1 }}
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
