import { Component } from "react"
import { FaBug } from "../icons"
import { SquareButton, ColoredButton } from "../button"
import {
    PrettyHeader,
    OnClickText,
    SimpleLink,
    SmallSpan,
    BorderedDiv,
} from "../pretty-defaults"

const EPIC_NOTES_REPO_URL = "https://github.com/mithi/epic-react-exercises"
const issueUrl = message => `${EPIC_NOTES_REPO_URL}/issues/new?title=${message}`

class DefaultErrorBoundary extends Component {
    state = { error: null }

    static getDerivedStateFromError(error) {
        return { error }
    }

    render() {
        const { error } = this.state
        const { resetFunction, FallbackComponent, children, ...otherProps } = this.props
        const Component = FallbackComponent || DefaultErrorView
        if (error) {
            return <Component {...{ error, resetFunction, ...otherProps }} />
        }

        return children
    }
}

const DIV_STYLE = {
    borderColor: "red",
    margin: "20px",
    padding: "20px",
    textAlign: "center",
    lineHeight: "1",
    flexDirection: "column",
}

const CENTERED_STYLE = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
}

function DefaultErrorView({ error, resetFunction, message }) {
    const issueHref = issueUrl(`Caught by error boundary: ${message} | ${error.message}`)
    const submitAnIssue = <SimpleLink href={issueHref}>submit an issue</SimpleLink>
    const tryReloading = <OnClickText onClick={resetFunction}>try reloading</OnClickText>
    return (
        <BorderedDiv style={DIV_STYLE}>
            <PrettyHeader style={{ color: "red", margin: "5px" }}>
                Something went wrong. :(
            </PrettyHeader>
            <SmallSpan>
                {message}. You can {submitAnIssue} or {tryReloading}.
            </SmallSpan>
            <div style={CENTERED_STYLE}>
                <ColoredButton
                    onClick={resetFunction}
                    style={{ backgroundColor: "red", margin: "5px", height: "32px" }}
                >
                    Reload
                </ColoredButton>
                <SquareButton href={issueHref}>
                    <FaBug />
                </SquareButton>
            </div>
            <SmallSpan>Error message: {error.message}</SmallSpan>
        </BorderedDiv>
    )
}

export { DefaultErrorBoundary, DefaultErrorView }
