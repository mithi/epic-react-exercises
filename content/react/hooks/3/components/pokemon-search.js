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
    outline: 0,
}

const FetchSubmitButtonText = () => (
    <>
        <span style={{ fontSize: "0.6rem" }}>
            Fetch <br /> that
        </span>
        <span
            style={{
                fontSize: "4rem",
                paddingTop: "15px",
                margin: "10px 5px",
            }}
        >
            <SiPokemon />
        </span>
    </>
)

const PokemonSuggestion = ({ name, buttonSubmit }) => {
    const { primaryColor } = useContext(ThemeContext)

    return (
        <a style={{ color: primaryColor }} onClick={() => buttonSubmit(name)}>
            {name}
        </a>
    )
}

const PokemonSearchSection = ({ onSubmit }) => {
    const { primaryColor, bodyClassNames, bodyFont, headerFont } = useContext(
        ThemeContext
    )
    const [incompleteName, setIncompleteName] = useState("")

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
                <input
                    onChange={e => setIncompleteName(e.target.value)}
                    className={bodyClassNames[0]}
                    style={{ ...INPUT_STYLE, fontFamily: bodyFont, margin: "5px" }}
                    placeholder="Which pokemon?"
                    value={incompleteName}
                />
                <TextButton
                    isInvertedColor={true}
                    style={{
                        ...ICON_STYLE,
                        backgroundColor: primaryColor,
                        fontFamily: bodyFont,
                        height: "3rem",
                    }}
                    type="submit"
                    disabled={!incompleteName.length}
                >
                    <FetchSubmitButtonText />
                </TextButton>
            </form>
        </>
    )
}

export default PokemonSearchSection