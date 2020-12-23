import Main from "components/main"
import { FaBug } from "react-icons/fa"
import { ThemeContext } from "providers"
import { useContext } from "react"
import { LinkAwayIconButton } from "components/button"

export default function FourOhfour() {
    const { headerFont } = useContext(ThemeContext)

    return (
        <Main>
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "auto",
                    margin: "20px",
                }}
            >
                <div
                    style={{
                        display: "flex",
                        alignItems: "flex-start",
                    }}
                >
                    <h1
                        style={{
                            fontFamily: headerFont,
                            fontSize: "100px",
                        }}
                    >
                        404
                    </h1>
                    <LinkAwayIconButton
                        aria-label={"report a bug"}
                        page="https://https://github.com/mithi/epic-react-notes/issues/new"
                    >
                        <FaBug />
                    </LinkAwayIconButton>
                </div>
            </div>
        </Main>
    )
}
