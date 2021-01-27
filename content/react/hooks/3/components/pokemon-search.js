import { TextButton } from "components/button"
import { SiPokemon } from "react-icons/si"
import { PrettyAnchor, PrettyInputField } from "components/pretty-defaults"

const ICON_STYLE = {
    width: "32%",
    borderRadius: "10px",
    margin: "5px",
    padding: "10px",
    height: "3rem",
}

const SUBMIT_BUTTON_STYLE = {
    fontSize: "4rem",
    paddingTop: "15px",
    margin: "10px 5px",
}

const FetchSubmitButton = ({ disabled }) => (
    <TextButton
        isInvertedColor={true}
        style={ICON_STYLE}
        type="submit"
        disabled={disabled}
        useBgPrimaryColor={true}
    >
        <span style={{ fontSize: "0.6rem" }}>
            Fetch <br /> that
        </span>
        <span style={SUBMIT_BUTTON_STYLE}>
            <SiPokemon />
        </span>
    </TextButton>
)

const PokemonSuggestion = ({ name, buttonSubmit }) => {
    return (
        <PrettyAnchor onClick={() => buttonSubmit(name)} href="#">
            {name}
        </PrettyAnchor>
    )
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
                <FetchSubmitButton disabled={!incompleteName.length} />
            </form>
        </>
    )
}

export default PokemonSearchSection
