import { useContext } from "react"
import { ThemeContext } from "providers"

const PokemonDataView = () => {
    const { headerFont, primaryColor } = useContext(ThemeContext)
    const ROW_STYLE = {
        borderBottom: `1px solid ${primaryColor}`,
        lineHeight: "25px",
        padding: "5px",
        minWidth: "75px",
    }

    return (
        <div
            style={{
                padding: "20px",
                margin: "20px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                border: `1px solid ${primaryColor}`,
                borderRadius: "15px",
            }}
        >
            <div
                style={{
                    width: "200px",
                    height: "200px",
                    border: `1px dashed ${primaryColor}`,
                    borderRadius: "15px",
                    padding: "5px",
                }}
            >
                <p>Pokemon Image</p>
            </div>
            <h1 style={{ padding: "15px", fontFamily: headerFont, fontSize: "40px" }}>
                Pokemon Name
            </h1>
            <table style={{ textAlign: "center", borderCollapse: "collapse" }}>
                <thead style={{ fontFamily: headerFont }}>
                    <tr>
                        <th style={ROW_STYLE}>Ability</th>
                        <th style={ROW_STYLE}>Type</th>
                        <th style={ROW_STYLE}>Damage</th>
                    </tr>
                </thead>
                <tbody style={{ fontSize: "12px" }}>
                    <tr>
                        <td style={ROW_STYLE}>First Ability</td>
                        <td style={ROW_STYLE}>Fire</td>
                        <td style={ROW_STYLE}>55</td>
                    </tr>
                    <tr>
                        <td style={ROW_STYLE}>Second Ability</td>
                        <td style={ROW_STYLE}>Water</td>
                        <td style={ROW_STYLE}>100</td>
                    </tr>
                    <tr>
                        <td style={ROW_STYLE}>Third Ability</td>
                        <td style={ROW_STYLE}>Water</td>
                        <td style={ROW_STYLE}>100</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default PokemonDataView
