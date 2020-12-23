import { ThemeContext } from "providers"
import { useContext } from "react"
import Main from "components/main"
import { LinkAwayIconButton } from "components/button"
import { FaBug } from "react-icons/fa"

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
                        page="https://github.com/mithi/epic-react-notes/issues/new"
                    >
                        <FaBug />
                    </LinkAwayIconButton>
                </div>
            </div>
        </Main>
    )
}
