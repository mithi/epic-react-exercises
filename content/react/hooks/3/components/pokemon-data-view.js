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
}

const POKEMON_IMAGE_STYLE = {
    width: "200px",
    height: "200px",
    borderRadius: "15px",
    padding: "5px",
}

const ROW_STYLE = {
    lineHeight: "25px",
    padding: "5px",
    minWidth: "75px",
    fontSize: "12px",
}

const TableRow = ({ ability, type, damage }) => {
    const { primaryColor } = useContext(ThemeContext)
    const style = { ...ROW_STYLE, borderBottom: `1px solid ${primaryColor}` }

    return (
        <tr>
            <td {...{ style }}>{ability}</td>
            <td {...{ style }}>{type}</td>
            <td {...{ style }}>{damage}</td>
        </tr>
    )
}

const TableHeader = () => {
    const { headerFont, primaryColor } = useContext(ThemeContext)
    const style = { ...ROW_STYLE, borderBottom: `1px solid ${primaryColor}` }
    return (
        <thead style={{ fontFamily: headerFont }}>
            <tr>
                <th {...{ style }}>Ability</th>
                <th {...{ style }}>Type</th>
                <th {...{ style }}>Damage</th>
            </tr>
        </thead>
    )
}

const PokemonDataView = ({ pokemonData }) => {
    const { headerFont, primaryColor } = useContext(ThemeContext)
    const SOLID_BORDER = { border: `1px solid ${primaryColor}` }
    const DASHED_BORDER = { border: `1px dashed ${primaryColor}` }
    const CARD_STYLE = { ...POKEMON_CARD_STYLE, ...SOLID_BORDER }
    const IMAGE_STYLE = { ...POKEMON_IMAGE_STYLE, ...DASHED_BORDER }
    const NAME_STYLE = { padding: "15px", fontFamily: headerFont, fontSize: "40px" }
    const TABLE_STYLE = { textAlign: "center", borderCollapse: "collapse" }

    if (!pokemonData) {
        return "No Pokemon"
    }

    return (
        <div style={CARD_STYLE}>
            <img src={pokemonData.image} height={"200px"} style={IMAGE_STYLE} />
            <h1 style={NAME_STYLE}>
                {pokemonData.name} ({pokemonData.number})
            </h1>
            <table style={TABLE_STYLE}>
                <TableHeader />
                <tbody>
                    {pokemonData.attacks.special.map(ability => (
                        <TableRow
                            {...{
                                key: ability.name,
                                ability: ability.name,
                                type: ability.type,
                                damage: ability.damage,
                            }}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default PokemonDataView
