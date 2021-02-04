import { TextButton } from "components/button"
import { PrettyAnchor, PrettyInputField } from "components/pretty-defaults"
// import { SiPokemon } from "react-icons/si"

const ICON_STYLE = {
    width: "32%",
    borderRadius: "10px",
    margin: "5px",
    height: "3rem",
}

const FetchSubmitButton = ({ disabled }) => (
    <TextButton
        isInvertedColor={true}
        style={ICON_STYLE}
        type="submit"
        disabled={disabled}
        useBgPrimaryColor={true}
    >
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                margin: "0px",
                padding: "0px",
            }}
        >
            Fetch!
        </div>
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
