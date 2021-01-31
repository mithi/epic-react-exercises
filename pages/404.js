import Main from "components/main"
import { PrettyHeader } from "components/pretty-defaults"
import { LinkAwayIconButton, LinkButton } from "components/button"
import { FaBug, FaHome } from "react-icons/fa"

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
                        href="https://github.com/mithi/epic-react-notes/issues/new?title=Unexpected%20404:%20file%20not%20found"
                        style={{ margin: "3px" }}
                    >
                        <FaBug />
                    </LinkAwayIconButton>
                    <LinkButton
                        aria-label={"home"}
                        href="/"
                        isIconButton={true}
                        style={{ margin: "3px" }}
                    >
                        <FaHome />
                    </LinkButton>
                </div>
            </div>
        </Main>
    )
}
