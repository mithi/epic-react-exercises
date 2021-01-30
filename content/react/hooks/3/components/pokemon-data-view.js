import { TextButton } from "components/button"
import { PrettyHeader } from "components/pretty-defaults"
import { useTheme } from "hooks"

const TOTALLY_CENTERED = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    textAlign: "center",
}

const POKEMON_CARD_STYLE = {
    padding: "20px",
    margin: "20px",
    borderRadius: "15px",
    minHeight: "400px",
    ...TOTALLY_CENTERED,
}

const POKEMON_IMAGE_STYLE = {
    width: "200px",
    minHeight: "200px",
    borderRadius: "15px",
    padding: "5px",
    fontSize: "20px",
    marginBottom: "20px",
    ...TOTALLY_CENTERED,
}

const ERROR_BUTTON_STYLE = {
    border: "1px solid red",
    fontSize: "16px",
    borderRadius: "8px",
    backgroundColor: "red",
    width: "auto",
    padding: "5px",
    height: "auto",
}

const ROW_STYLE = {
    padding: "10px",
    minWidth: "100px",
    fontSize: "14px",
    textAlign: "center",
}

const usePokemonDataViewStyles = dataViewType => {
    const { primaryColor } = useTheme()

    let border = (border = `1px dashed ${primaryColor}`)

    if (dataViewType === "error") {
        border = `1px dashed red`
    } else if (dataViewType === "info") {
        border = `1px solid ${primaryColor}`
    }

    const imgStyle = { ...POKEMON_IMAGE_STYLE, border }
    const trStyle = { ...ROW_STYLE, borderBottom: border }
    const cardStyle = { ...POKEMON_CARD_STYLE, border }

    const PrettyTr = ({ content }) => (
        <tr style={trStyle}>
            <td style={trStyle}>{content[0]}</td>
            <td style={trStyle}>{content[1]}</td>
            <td style={trStyle}>{content[2]}</td>
        </tr>
    )

    return { imgStyle, trStyle, cardStyle, PrettyTr }
}

const PokemonLoadingView = ({ pokemonName }) => {
    return (
        <PokemonDataView
            {...{
                name: `Loading ${pokemonName.slice(0, 15)}...`,
                imageAlternative: "Loading...",
                dataViewType: "loading",
            }}
        />
    )
}

const PokemonIdleView = () => {
    return (
        <PokemonDataView
            {...{
                name: `No Pokemon Yet!`,
                imageAlternative: "Please submit a pokemon!",
                dataViewType: "idle",
            }}
        />
    )
}

function PokemonErrorView({ error, resetFunction }) {
    const imageAlternative = (
        <div role="alert" style={{ fontSize: "15px", padding: "10px" }}>
            <span>{error.message}</span>
            <div style={TOTALLY_CENTERED}>
                <TextButton
                    onClick={resetFunction}
                    style={ERROR_BUTTON_STYLE}
                    isInvertedColor={true}
                >
                    <PrettyHeader> Try again </PrettyHeader>
                </TextButton>
                <div> This error was caught by the error boundary!</div>
            </div>
        </div>
    )

    return (
        <PokemonDataView
            {...{
                name: "Error! :(",
                imageAlternative,
                dataViewType: "error",
            }}
        />
    )
}

const PokemonInfoView = ({ pokemonData }) => {
    return <PokemonDataView {...{ ...pokemonData, dataViewType: "info" }} />
}

const PokemonDataView = ({
    imageUrl,
    name,
    number,
    abilities,
    imageAlternative,
    dataViewType,
}) => {
    const { imgStyle, trStyle, cardStyle, PrettyTr } = usePokemonDataViewStyles(
        dataViewType
    )

    /****************
     * POKEMON IMAGE COMPONENT
     ****************/
    let image = <div style={imgStyle}>{imageAlternative || "No image."}</div>
    if (imageUrl) {
        image = <img src={imageUrl} alt={name} height={"200px"} style={imgStyle} />
    }

    /****************
     * POKEMON ABILITY TABLE COMPONENT
     ****************/
    let tableBody = <PrettyTr {...{ content: ["-", "-", "-"] }} />

    if (abilities) {
        tableBody = abilities.map(abilityData => {
            const { name, type, damage } = abilityData
            return <PrettyTr {...{ key: name, content: [name, type, damage] }} />
        })
    }

    /****************
     * FINAL LAYOUT
     ****************/
    return (
        <div style={cardStyle}>
            <PrettyHeader Component="h1" style={{ padding: "15px", fontSize: "40px" }}>
                {name} <sup style={{ fontSize: "20px" }}>({number || "xxx"})</sup>
            </PrettyHeader>
            {image}
            <table>
                <thead>
                    <tr style={{ ...trStyle, fontSize: "20px" }}>
                        <PrettyHeader Component="th">Ability</PrettyHeader>
                        <PrettyHeader Component="th">Type</PrettyHeader>
                        <PrettyHeader Component="th">Damage</PrettyHeader>
                    </tr>
                </thead>
                <tbody>{tableBody}</tbody>
            </table>
        </div>
    )
}

export { PokemonIdleView, PokemonInfoView, PokemonLoadingView, PokemonErrorView }
