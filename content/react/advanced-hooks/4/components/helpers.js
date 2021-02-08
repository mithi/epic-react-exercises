import { PrettyHeader } from "components/pretty-defaults"

const DisplaySize = ({ height, width }) => (
    <PrettyHeader style={{ fontSize: "30px", padding: "10px" }}>
        {width}px / {height}px
    </PrettyHeader>
)

const BigHeadMessage = ({ state }) => {
    if (!state) {
        return null
    }

    return (
        <div
            style={{
                fontSize: "15px",
                margin: "15px",
            }}
        >
            <div style={{ lineHeight: "1", maxWidth: "250px" }}>
                You are seeing
                <PrettyHeader
                    Component="span"
                    style={{ fontSize: "20px", margin: "5px" }}
                >
                    {state.name}
                </PrettyHeader>
                because your screen size is{" "}
                <PrettyHeader Component="span" style={{ fontSize: "20px" }}>
                    {state.size}!
                </PrettyHeader>
                <br />
                <div
                    style={{
                        paddingTop: "10px",
                        fontSize: "30px",
                    }}
                >
                    {state.icon}
                </div>
            </div>
        </div>
    )
}

export { DisplaySize, BigHeadMessage }
