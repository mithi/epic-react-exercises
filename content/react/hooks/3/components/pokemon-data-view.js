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

const PokemonLoadingView = () => (
    <PokemonDataView
        {...{
            name: "Loading pokemon",
            number: "...",
            imageUrl: null,
            abilities: null,
            borderStyle: "dashed",
        }}
    />
)

const PokemonInfoView = ({ pokemonData }) => (
    <PokemonDataView {...{ ...pokemonData, borderStyle: "solid" }} />
)

const PokemonCard = ({ children, style }) => {
    const CARD_STYLE = { ...POKEMON_CARD_STYLE, ...style }
    return <div style={CARD_STYLE}>{children}</div>
}

const PokemonDataView = ({ imageUrl, name, number, abilities, borderStyle }) => {
    const { headerFont, primaryColor } = useContext(ThemeContext)

    const border = `1px ${borderStyle ? borderStyle : "solid"} ${primaryColor}`
    const IMAGE_STYLE = { ...POKEMON_IMAGE_STYLE, border }
    const NAME_STYLE = { padding: "15px", fontFamily: headerFont, fontSize: "40px" }
    const TABLE_STYLE = { textAlign: "center", borderCollapse: "collapse" }
    const TABLE_HEADER_STYLE = {
        ...ROW_STYLE,
        fontSize: "18px",
        borderBottom: `1px solid ${primaryColor}`,
    }

    let image = <div style={IMAGE_STYLE}>...</div>
    if (imageUrl) {
        image = <img src={imageUrl} alt={name} height={"200px"} style={IMAGE_STYLE} />
    }

    let tableBody = <TableRow {...{ ability: "-", type: "-", damage: "-" }} />
    if (abilities) {
        tableBody = abilities.map(ability => (
            <TableRow
                {...{
                    key: ability.name,
                    ability: ability.name,
                    type: ability.type,
                    damage: ability.damage,
                }}
            />
        ))
    }

    return (
        <PokemonCard style={{ border }}>
            {image}
            <h1 style={NAME_STYLE}>
                {name} <sup style={{ fontSize: "20px" }}>({number})</sup>
            </h1>
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
