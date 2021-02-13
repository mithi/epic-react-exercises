import { useCodeTheme } from "providers/code-theme"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"

const Code = ({ children, language }) => {
    const { codeTheme } = useCodeTheme()

    return (
        <div
            style={{
                fontSize: "12px",
                letterSpacing: "1px",
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

export default Code
