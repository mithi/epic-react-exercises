/* eslint-disable react/display-name */
import { useState } from "react"
import ReactMarkdown from "react-markdown"
import {
    PrettyHeader,
    PrettyLink,
    PrettyAnchor,
    OnClickText,
    BorderedDiv,
} from "components/pretty-defaults"
import CodeBlock from "./dynamic-code-block"

const Code = ({ children, language }) => {
    const [showCode, setShowCode] = useState(false)
    const codeBlock = showCode && <CodeBlock {...{ language }}>{children}</CodeBlock>

    return (
        <div>
            <BorderedDiv
                style={{
                    margin: "10px",
                    padding: "10px",
                    borderStyle: "dotted",
                    width: "auto",
                    borderRadius: "5px",
                }}
            >
                <OnClickText onClick={() => setShowCode(!showCode)}>
                    <PrettyHeader style={{ paddingLeft: "5px", margin: "10px" }}>
                        {showCode ? "Hide Code" : "Show Code"}
                    </PrettyHeader>
                </OnClickText>
                {codeBlock}
            </BorderedDiv>
        </div>
    )
}

const CustomHeading = ({ children, level }) => {
    const style = { marginTop: "20px" }
    switch (level) {
        case 1:
            return (
                <PrettyHeader Component="h1" {...{ style }}>
                    {children}
                </PrettyHeader>
            )

        case 2:
            return (
                <PrettyHeader Component="h2" {...{ style }}>
                    {children}
                </PrettyHeader>
            )
        case 3:
            return (
                <PrettyHeader Component="h3" {...{ style }}>
                    {children}
                </PrettyHeader>
            )
        case 4:
            return <PrettyHeader Component="h4">{children}</PrettyHeader>
        case 5:
            return <PrettyHeader Component="h5">{children}</PrettyHeader>
        default:
            return <PrettyHeader Component="h6">{children}</PrettyHeader>
    }
}

const DefaultLink = ({ href, children }) => {
    if (href.slice(0, 4) === "http") {
        return (
            <PrettyAnchor {...{ href, target: "_blank", rel: "noopener noreferrer" }}>
                {children}
            </PrettyAnchor>
        )
    } else if (href.slice(0, 1) === "/") {
        return <PrettyLink {...{ href }}>{children}</PrettyLink>
    }

    return new Error(
        `Link in markdown does not start with "http" or "/", href=${href}, children=${children}`
    )
}

const renderers = {
    code: ({ language, value }) => {
        return <Code language={language}>{value}</Code>
    },
    heading: props => {
        return <CustomHeading {...props} />
    },
    link: props => {
        return <DefaultLink {...props} />
    },
    paragraph: props => {
        return <p style={{ marginBottom: "6px", marginTop: "6px" }}>{props.children}</p>
    },
}

const MarkdownRender = ({ children }) => (
    <div style={{ marginBottom: "20px" }}>
        <ReactMarkdown {...{ renderers, children }} />
    </div>
)

export default MarkdownRender
