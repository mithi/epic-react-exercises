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

const EPIC_NOTES_REPO_URL = "https://github.com/mithi/epic-notes"
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

function DefaultErrorView({ error, resetFunction, message }) {
    const issueHref = issueUrl(`Caught by error boundary: ${message} | ${error.message}`)
    const submitAnIssue = <SimpleLink href={issueHref}>submit an issue</SimpleLink>
    const tryReloading = <OnClickText onClick={resetFunction}>try reloading.</OnClickText>
    return (
        <BorderedDiv
            style={{
                borderColor: "red",
                margin: "20px",
                padding: "20px",
                textAlign: "center",
                lineHeight: "1",
                flexDirection: "column",
            }}
        >
            <PrettyHeader style={{ color: "red", margin: "10px" }}>
                Error! :(
            </PrettyHeader>
            <SmallSpan>
                {message}. You can {submitAnIssue} or {tryReloading}.
            </SmallSpan>
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <ColoredButton
                    onClick={resetFunction}
                    style={{ backgroundColor: "red", margin: "5px", height: "35px" }}
                >
                    Reload
                </ColoredButton>
                <SquareButton href={issueHref} side={"35px"}>
                    <FaBug />
                </SquareButton>
            </div>
            <SmallSpan>Error message: {error.message}</SmallSpan>
        </BorderedDiv>
    )
}

export { DefaultErrorBoundary, DefaultErrorView }
