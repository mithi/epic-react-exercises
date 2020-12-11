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

const Code = ({ children }) => {
    return (
        <div style={{ fontSize: "12px" }}>
            <SyntaxHighlighter
                language="javascript"
                style={atomDark}
                showLineNumbers={true}
                wrapLongLines={true}
                lineNumberStyle={LINE_NUMBER_STYLE}
            >
                {children}
            </SyntaxHighlighter>
        </div>
    )
}

export default Code
