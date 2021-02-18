import Main from "components/main"
import { SquareButton } from "components/button"
import { FaBug, FaHome } from "components/icons"

const EPIC_NOTES_REPO_URL = "https://github.com/mithi/epic-notes"

const issueUrl = message => {
    message = message.split(" ").join("%20")
    return `${EPIC_NOTES_REPO_URL}/issues/new?title=${message}`
}

const Button = props => (
    <SquareButton side="70px" style={{ fontSize: "50px" }} {...props} />
)

const ImpossiblePageIcons = ({ issueMessage }) => (
    <div style={{ display: "flex" }}>
        <Button aria-label="report a bug" href={issueUrl(issueMessage)}>
            <FaBug />
        </Button>
        <Button aria-label="home" href="/">
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
