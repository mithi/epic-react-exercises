import { useContext } from "react"
import ReactMarkdown from "react-markdown"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { ThemeContext } from "providers"
import { PrettyHeader, PrettyAnchor } from "components/pretty-defaults"

const LINE_NUMBER_STYLE = {
    minWidth: "25px",
    width: "25px",
    paddingRight: "10px",
    paddingLeft: "0",
    marginRight: "20px",
    marginLeft: 0,
}

const Code = ({ children, language }) => {
    const { codeTheme, primaryColor } = useContext(ThemeContext)

    return (
        <div
            style={{
                fontSize: "12px",
                letterSpacing: "1px",
                marginTop: "20px",
                marginBottom: "20px",
            }}
        >
            <SyntaxHighlighter
                language={language}
                style={codeTheme}
                showLineNumbers={false}
                wrapLongLines={false}
                wrapLines={false}
                lineNumberStyle={{
                    ...LINE_NUMBER_STYLE,
                    borderRight: `1px solid ${primaryColor}`,
                }}
            >
                {children}
            </SyntaxHighlighter>
        </div>
    )
}

const CustomHeading = ({ children, level }) => {
    const style = { marginTop: "20px" }
    switch (level) {
        case 1:
            return (
                <PrettyHeader Component="h1" {...{ style }}>
                    {" "}
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

const LinkAwayText = ({ href, children }) => {
    return <PrettyAnchor {...{ href }}>{children}</PrettyAnchor>
}

const renderers = {
    code: ({ language, value }) => {
        return <Code children={value} language={language} />
    },
    heading: props => {
        return <CustomHeading {...props} />
    },
    link: props => {
        return <LinkAwayText {...props} />
    },

    paragraph: props => {
        return <p style={{ marginBottom: "15px" }}>{props.children}</p>
    },
}

const MarkdownRender = ({ children }) => <ReactMarkdown {...{ renderers, children }} />

export default MarkdownRender
