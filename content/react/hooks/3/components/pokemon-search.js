import { useContext, useState } from "react"
import { TextButton } from "components/button"
import { SiPokemon } from "react-icons/si"
import { ThemeContext } from "providers"

const INPUT_STYLE = {
    width: "68%",
    borderWidth: "0px",
    borderRadius: "10px",
    margin: "5px 0px",
    padding: "5px 15px",
}

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
    const { primaryColor } = useContext(ThemeContext)

    return (
        <a style={{ color: primaryColor }} onClick={() => buttonSubmit(name)} href="#">
            {name}
        </a>
    )
}

const SearchInputField = ({ placeholder, value, onChange }) => {
    const { bodyClassNames, bodyFont } = useContext(ThemeContext)
    return (
        <input
            className={bodyClassNames[0]}
            style={{ ...INPUT_STYLE, fontFamily: bodyFont, margin: "5px" }}
            {...{ placeholder, value, onChange }}
        />
    )
}

const PokemonSearchSection = ({ onSubmit, setIncompleteName, incompleteName }) => {
    const { headerFont } = useContext(ThemeContext)

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
            <h2 style={{ fontFamily: headerFont }}>Fetch that Pokemon!</h2>
            <p style={{ fontSize: "12px" }}>
                Out of ideas? Try{" "}
                <PokemonSuggestion {...{ name: "Pikachu", buttonSubmit }} />,{" "}
                <PokemonSuggestion {...{ name: "Charizard", buttonSubmit }} />, or{" "}
                <PokemonSuggestion {...{ name: "Ninetales", buttonSubmit }} />
            </p>
            <form style={{ display: "flex" }} onSubmit={handleSubmit}>
                <SearchInputField
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
