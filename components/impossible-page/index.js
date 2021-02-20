import Main from "components/main"
import { SquareButton } from "components/button"
import { FaBug, FaHome } from "components/icons"

const EPIC_NOTES_REPO_URL = "https://github.com/mithi/epic-notes"
const issueUrl = message => `${EPIC_NOTES_REPO_URL}/issues/new?title=${message}`

const Button = props => (
    <SquareButton side="70px" style={{ fontSize: "50px" }} {...props} />
)

const ImpossiblePageIcons = ({ issueMessage }) => (
    <div style={{ display: "flex" }}>
        <Button
            href={issueUrl(issueMessage)}
            aria-label="report a bug"
            title="report a bug"
        >
            <FaBug />
        </Button>
        <Button href="/" aria-label="go back home" title="go back home">
            <FaHome />
        </Button>
    </div>
)

const ImpossiblePage = ({ children, issueMessage, style }) => {
    return (
        <Main
            mainStyle={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                width: "100%",
                height: "90vh",
                ...style,
            }}
        >
            {children}
            <ImpossiblePageIcons {...{ issueMessage }} />
        </Main>
    )
}
export { ImpossiblePageIcons, ImpossiblePage }
