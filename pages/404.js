import Main from "components/main"
import { PrettyHeader } from "components/pretty-defaults"
import { SquareButton } from "components/button"
import { FaBug, FaHome } from "components/icons"

export default function FourOhfour() {
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
                    <PrettyHeader Component="h1" style={{ fontSize: "100px" }}>
                        404
                    </PrettyHeader>
                    <SquareButton
                        aria-label="report a bug"
                        href="https://github.com/mithi/epic-react-notes/issues/new?title=Unexpected%20404:%20file%20not%20found"
                        side="large"
                    >
                        <FaBug />
                    </SquareButton>
                    <SquareButton aria-label="home" href="/" side="large">
                        <FaHome />
                    </SquareButton>
                </div>
            </div>
        </Main>
    )
}
