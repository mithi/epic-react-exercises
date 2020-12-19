import ReactMarkdown from "react-markdown"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { atomDark } from "react-syntax-highlighter/dist/cjs/styles/prism"

const LINE_NUMBER_STYLE = {
    minWidth: "25px",
    width: "25px",
    paddingRight: "10px",
    paddingLeft: "0",
    borderRight: "1px solid red",
    marginRight: "20px",
    marginLeft: 0,
}

const Code = ({ children, language }) => {
    return (
        <div style={{ fontSize: "12px" }}>
            <SyntaxHighlighter
                language={language}
                style={atomDark}
                showLineNumbers={true}
                wrapLongLines={true}
                wrapLines={true}
                lineNumberStyle={LINE_NUMBER_STYLE}
            >
                {children}
            </SyntaxHighlighter>
        </div>
    )
}

const renderers = {
    code: ({ language, value }) => {
        return <Code children={value} language={language} />
    },
}

const MarkdownRender = ({ children }) => <ReactMarkdown {...{ renderers, children }} />

export default MarkdownRender
