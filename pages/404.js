import Main from "components/main"
import { PrettyHeader } from "components/pretty-defaults"
import { LinkAwayIconButton } from "components/button"
import { FaBug } from "react-icons/fa"

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
                    <PrettyHeader Component={"h1"} style={{ fontSize: "100px" }}>
                        404
                    </PrettyHeader>
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
