import { useContext } from "react"
import { ThemeContext } from "providers"

const POKEMON_CARD_STYLE = {
    padding: "20px",
    margin: "20px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    borderRadius: "15px",
    minHeight: "500px",
}

const POKEMON_IMAGE_STYLE = {
    width: "200px",
    height: "200px",
    borderRadius: "15px",
    padding: "5px",
    fontSize: "30px",
    textAlign: "center",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
}

const ROW_STYLE = {
    lineHeight: "25px",
    padding: "5px",
    minWidth: "75px",
    fontSize: "14px",
}

const TABLE_STYLE = {
    textAlign: "center",
    borderCollapse: "collapse",
    marginTop: "15px",
}

const PokemonLoadingView = ({ pokemonName }) => {
    const { primaryColor } = useContext(ThemeContext)
    const border = `1px dashed ${primaryColor}`

    return (
        <PokemonDataView
            {...{
                name: `Loading ${pokemonName.slice(0, 15)}...`,
                number: "xxx",
                imageUrl: null,
                abilities: null,
                border,
            }}
        />
    )
}

const PokemonInfoView = ({ pokemonData }) => {
    const { primaryColor } = useContext(ThemeContext)
    const border = `1px solid ${primaryColor}`
    return <PokemonDataView {...{ ...pokemonData, border }} />
}

const PokemonCard = ({ children, style }) => {
    const CARD_STYLE = { ...POKEMON_CARD_STYLE, ...style }
    return <div style={CARD_STYLE}>{children}</div>
}

const PokemonDataView = ({ imageUrl, name, number, abilities, border }) => {
    /****************
     * DECLARE STYLES
     ****************/
    const { headerFont } = useContext(ThemeContext)
    const IMAGE_STYLE = { ...POKEMON_IMAGE_STYLE, border }
    const NAME_STYLE = { fontFamily: headerFont, padding: "15px", fontSize: "40px" }
    const TABLE_HEADER_STYLE = { ...ROW_STYLE, fontSize: "18px", borderBottom: border }
    const TABLE_ROW_STYLE = { ...ROW_STYLE, borderBottom: border }

    /****************
     * POKEMON IMAGE COMPONENT
     ****************/
    let image = <div style={IMAGE_STYLE}>😭</div>
    if (imageUrl) {
        image = <img src={imageUrl} alt={name} height={"200px"} style={IMAGE_STYLE} />
    }

    /****************
     * POKEMON ABILITY TABLE COMPONENT
     ****************/
    let tableBody = (
        <tr>
            <td style={TABLE_ROW_STYLE}>-</td>
            <td style={TABLE_ROW_STYLE}>-</td>
            <td style={TABLE_ROW_STYLE}>-</td>
        </tr>
    )

    if (abilities) {
        tableBody = abilities.map(abilityData => {
            const { name, type, damage } = abilityData
            return (
                <tr key={name}>
                    <td style={TABLE_ROW_STYLE}>{name}</td>
                    <td style={TABLE_ROW_STYLE}>{type}</td>
                    <td style={TABLE_ROW_STYLE}>{damage}</td>
                </tr>
            )
        })
    }

    /****************
     * FINAL LAYOUT
     ****************/
    return (
        <PokemonCard style={{ border }}>
            <h1 style={NAME_STYLE}>
                {name} <sup style={{ fontSize: "20px" }}>({number})</sup>
            </h1>
            {image}
            <table style={TABLE_STYLE}>
                <thead style={{ fontFamily: headerFont }}>
                    <tr style={TABLE_HEADER_STYLE}>
                        <th>Ability</th>
                        <th>Type</th>
                        <th>Damage</th>
                    </tr>
                </thead>

                <tbody>{tableBody}</tbody>
            </table>
        </PokemonCard>
    )
}

export { PokemonInfoView, PokemonLoadingView, PokemonCard }
