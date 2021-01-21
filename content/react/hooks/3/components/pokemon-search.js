import { useContext, useState } from "react"
import { IconButton } from "components/button"
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
        <span
            style={{
                fontSize: "0.6rem",
            }}
        >
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
const PokemonSearchSection = ({ onSubmit }) => {
    const { primaryColor, bodyClassNames, bodyFont } = useContext(ThemeContext)
    const [incompleteName, setIncompleteName] = useState("")

    function handleChange(e) {
        setIncompleteName(e.target.value)
    }

    function handleSubmit(e) {
        e.preventDefault()
        const completeName = incompleteName
        onSubmit(completeName)
        setIncompleteName("")
    }

    return (
        <>
            <p style={{ fontSize: "12px" }}>Try Pikachu, Charizard, Bulbasaur...</p>
            <form style={{ display: "flex" }} onSubmit={handleSubmit}>
                <input
                    onChange={handleChange}
                    className={bodyClassNames[0]}
                    style={{ ...INPUT_STYLE, fontFamily: bodyFont, margin: "5px" }}
                    placeholder="Which pokemon..."
                    value={incompleteName}
                />
                <IconButton
                    isInvertedColor={true}
                    style={{
                        ...ICON_STYLE,
                        backgroundColor: primaryColor,
                        fontFamily: bodyFont,
                    }}
                    type="submit"
                    disabled={!incompleteName.length}
                >
                    <FetchSubmitButtonText />
                </IconButton>
            </form>
        </>
    )
}

export default PokemonSearchSection
