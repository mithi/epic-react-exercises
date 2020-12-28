import { useContext } from "react"
import ReactMarkdown from "react-markdown"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { ThemeContext } from "providers"

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
    const { headerFont } = useContext(ThemeContext)

    const header = <span style={{ fontFamily: headerFont }}>{children}</span>
    switch (level) {
        case 1:
            return <h1 style={{ marginTop: "20px" }}>{header}</h1>
        case 2:
            return <h2 style={{ marginTop: "20px" }}>{header}</h2>
        case 3:
            return <h3> {header}</h3>
        case 4:
            return <h4>{header}</h4>
        case 5:
            return <h5>{header}</h5>
        default:
            return <h6>{header}</h6>
    }
}

const LinkAwayText = ({ href, children }) => {
    const { primaryColor } = useContext(ThemeContext)
    return (
        <a {...{ href }} style={{ color: primaryColor }}>
            {children}
        </a>
    )
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
}

const MarkdownRender = ({ children }) => <ReactMarkdown {...{ renderers, children }} />

export default MarkdownRender
