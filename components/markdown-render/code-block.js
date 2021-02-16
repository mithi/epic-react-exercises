import { useCodeTheme } from "providers/code-theme"
import getCodeTheme from "providers/code-theme/get-code-theme"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"

const Code = ({ children, language }) => {
    const { codeThemeId } = useCodeTheme()
    const codeTheme = getCodeTheme(codeThemeId)

    return (
        <div style={{ fontSize: "12px" }}>
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
