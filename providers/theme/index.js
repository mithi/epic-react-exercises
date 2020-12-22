import { createContext, useEffect } from "react"
import useStickyState from "../../hooks/useStickyState"
import styles from "./Theme.module.css"

export const NUMBER_OF_BODY_FONTS = 5
export const NUMBER_OF_HEADER_FONTS = 5
export const NUMBER_OF_CODE_THEMES = 3

export const COLORS = ["pink", "green", "blue", "purple", "orange"]
export const NUMBER_OF_COLORS = COLORS.length

const colored = id => {
    return {
        onHover: styles[`${COLORS[id]}BgOnHover`],
        classColor: styles[`${COLORS[id]}Color`],
        var: `var(--${COLORS[id]}-0)`,
    }
}

/*
export const NUMBER_OF_THEMES = 3
export const THEMES = {
    dark: "dark",
    light: "light",
    funky: "funky",
}
*/

const DEFAULT = {
    bodyFont: "var(--body-font-02)",
    headerFont: "var(--header-font-01)",
    primaryColor: colored(COLORS[0]).var,
}

const ThemeContext = createContext(DEFAULT)

const ThemeProvider = ({ children }) => {
    //const [theme, setTheme] = useStickyState("theme", THEMES.dark)
    const [colorId, setColorId] = useStickyState(0, "colorId")
    const [headerFontId, setHeaderFontId] = useStickyState(0, "headerId")
    const [bodyFontId, setBodyFontId] = useStickyState(0, "bodyFontId")
    const [codeThemeId, setCodeThemeId] = useStickyState(0, "codeThemId")
    const bodyClassNames = [styles.darkBody]
    const sectionClassNames = [styles.darkSection]
    const onHoverClassName = colored(colorId).onHover
    const buttonClassNames = [
        styles.darkButton,
        onHoverClassName,
        colored(colorId).classColor,
    ]

    const nextColor = () => {
        const n = (Number(colorId) + 1) % NUMBER_OF_COLORS
        setColorId(n)
    }

    const nextBodyFont = () => {
        const n = (Number(bodyFontId) + 1) % NUMBER_OF_BODY_FONTS
        setBodyFontId(n)
    }

    const nextHeaderFont = () => {
        const n = (Number(headerFontId) + 1) % NUMBER_OF_HEADER_FONTS
        setHeaderFontId(n)
    }

    const nextCodeTheme = () => {
        const n = (Number(codeThemeId) + 1) % NUMBER_OF_CODE_THEMES
        setCodeThemeId(n)
    }

    const primaryColor = colored(colorId).var
    const headerFont = `var(--header-font-0${headerFontId})`
    const bodyFont = `var(--body-font-0${bodyFontId})`

    return (
        <ThemeContext.Provider
            value={{
                bodyFont,
                headerFont,
                primaryColor,
                nextBodyFont,
                codeThemeId,
                nextColor,
                nextHeaderFont,
                nextCodeTheme,
                bodyClassNames,
                sectionClassNames,
                buttonClassNames,
                onHoverClassName,
            }}
        >
            {children}
        </ThemeContext.Provider>
    )
}

export { ThemeProvider, ThemeContext }
