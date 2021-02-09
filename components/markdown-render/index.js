/* eslint-disable react/display-name */
import { useState } from "react"
import { useCodeTheme, CodeThemeProvider } from "providers/code-theme"
import ReactMarkdown from "react-markdown"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import {
    PrettyHeader,
    PrettyLink,
    PrettyAnchor,
    OnClickText,
} from "components/pretty-defaults"

const Code = ({ children, language }) => {
    const { codeTheme } = useCodeTheme()
    const [showCode, setShowCode] = useState(true)

    const codeBlock = (
        <SyntaxHighlighter
            language={language}
            style={codeTheme}
            wrapLongLines={false}
            wrapLines={false}
            {...{ tabIndex: "0" }}
        >
            {children}
        </SyntaxHighlighter>
    )

    return (
        <div
            style={{
                fontSize: "12px",
                letterSpacing: "1px",
                marginTop: "20px",
                marginBottom: "20px",
            }}
        >
            <OnClickText onClick={() => setShowCode(!showCode)}>
                <PrettyHeader style={{ paddingLeft: "5px" }}>
                    {showCode ? "Hide Code" : "Show Code"}
                </PrettyHeader>
            </OnClickText>
            {showCode ? codeBlock : null}
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
            return <PrettyHeader Component="h3">{children}</PrettyHeader>
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
        return <p style={{ marginBottom: "10px", fontSize: "18px" }}>{props.children}</p>
    },
}

const MarkdownRender = ({ children }) => (
    <CodeThemeProvider>
        <ReactMarkdown {...{ renderers, children }} />
    </CodeThemeProvider>
)

export default MarkdownRender
