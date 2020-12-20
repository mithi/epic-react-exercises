import { createContext } from "react"
import useStickyState from "../../hooks/useStickyState"
import styles from "./Theme.module.css"

export const NUMBER_OF_BODY_FONTS = 5

export const COLORS = ["pink", "green", "blue", "purple", "orange"]
export const NUMBER_OF_COLORS = COLORS.length

const colored = colorName => {
    return {
        onHover: styles[`pinkBgOnHover`],
        classColor: styles[`${colorName}Color`],
        var: `var(--${colorName}-0)`,
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
    bodyClassNames: [styles.darkBody],
}

const ThemeContext = createContext(DEFAULT)

const ThemeProvider = ({ children }) => {
    //const [theme, setTheme] = useStickyState("theme", THEMES.dark)
    const [bodyFont, _setBodyFont] = useStickyState(DEFAULT.bodyFont, "bodyFont")
    const [headerFont, _setHeaderFont] = useStickyState(DEFAULT.headerFont, "headerFont")
    const [color, _setColor] = useStickyState(COLORS[0], "primaryColor")

    const bodyClassNames = [styles.darkBody]
    const sectionClassNames = [styles.darkSection]
    const buttonClassNames = [
        styles.darkBody,
        styles.darkButton,
        colored(color).onHover,
        colored(color).classColor,
    ]

    const primaryColor = colored(color).var
    console.log("color", color)
    console.log("onHover", colored(color).onHover)
    console.log("classColor", colored(color).classColor)
    console.log("primaryColor", primaryColor)

    return (
        <ThemeContext.Provider
            value={{
                bodyFont,
                headerFont,
                primaryColor,
                bodyClassNames,
                sectionClassNames,
                buttonClassNames,
            }}
        >
            {children}
        </ThemeContext.Provider>
    )
}

export { ThemeProvider, ThemeContext }
