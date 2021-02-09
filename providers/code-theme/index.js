import { createContext, useContext } from "react"
import { useStickyState } from "hooks"
import codeThemes from "./code-themes"
export const NUMBER_OF_CODE_THEMES = codeThemes.length

const CodeThemeContext = createContext()

const CodeThemeProvider = ({ children }) => {
    const [codeThemeId, setCodeThemeId] = useStickyState(0, "codeThemeId")
    const codeTheme = codeThemes[codeThemeId]

    const nextCodeTheme = () => {
        const n = (Number(codeThemeId) + 1) % NUMBER_OF_CODE_THEMES
        setCodeThemeId(n)
    }

    return (
        <CodeThemeContext.Provider
            value={{
                codeTheme,
                nextCodeTheme,
            }}
        >
            {children}
        </CodeThemeContext.Provider>
    )
}

function useCodeTheme() {
    const context = useContext(CodeThemeContext)
    if (!context) {
        throw new Error(
            `hook: useCodeTheme must be used within a provider: CodeThemeProvider`
        )
    }
    return context
}

export { CodeThemeProvider, CodeThemeContext, useCodeTheme }
