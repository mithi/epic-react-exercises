/* eslint-disable react/display-name */
import { useState } from "react"
import { useCodeTheme } from "providers/code-theme"
import ReactMarkdown from "react-markdown"
import {
    PrettyHeader,
    PrettyLink,
    PrettyAnchor,
    OnClickText,
} from "components/pretty-defaults"
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter"
import jsx from "react-syntax-highlighter/dist/cjs/languages/prism/jsx"
SyntaxHighlighter.registerLanguage("jsx", jsx)

const MiniCode = ({ children, language }) => {
    const { codeTheme } = useCodeTheme()
    return (
        <div
            style={{
                fontSize: "12px",
                letterSpacing: "1px",
                marginBottom: "20px",
            }}
        >
            <SyntaxHighlighter
                language={language}
                style={codeTheme}
                wrapLongLines={false}
                wrapLines={false}
                {...{ tabIndex: "0" }}
            >
                {children}
            </SyntaxHighlighter>
        </div>
    )
}

const Code = ({ children, language }) => {
    const [showCode, setShowCode] = useState(false)
    const codeBlock = showCode && <MiniCode {...{ children, language }} />

    return (
        <>
            <OnClickText onClick={() => setShowCode(!showCode)}>
                <PrettyHeader
                    style={{ paddingLeft: "5px", fontSize: "12px", marginTop: "10px" }}
                >
                    {showCode ? "Hide Code" : "Show Code"}
                </PrettyHeader>
            </OnClickText>
            {codeBlock}
        </>
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

const MarkdownRender = ({ children }) => <ReactMarkdown {...{ renderers, children }} />

export { MarkdownRender, MiniCode }
