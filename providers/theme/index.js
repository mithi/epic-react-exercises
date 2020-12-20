import { createContext } from "react"
import useStickyState from "../../hooks/useStickyState"
import styles from "./Theme.module.css"

export const NUMBER_OF_BODY_FONTS = 5

export const PRIMARY_COLORS = {
    pink: "var(--pink-0)",
    green: "var(--green-0)",
    blue: "var(--blue-0)",
    purple: "var(--purple-0)",
    orange: "var(--orange-0)",
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
    primaryColor: PRIMARY_COLORS.green,
    bodyClassNames: [styles.darkBody],
}

const ThemeContext = createContext(DEFAULT)

const ThemeProvider = ({ children }) => {
    //const [theme, setTheme] = useStickyState("theme", THEMES.dark)
    const [bodyFont, _setBodyFont] = useStickyState(DEFAULT.bodyFont, "bodyFont")
    const [headerFont, _setHeaderFont] = useStickyState(DEFAULT.headerFont, "headerFont")

    const [primaryColor, _setPrimaryColor] = useStickyState(
        DEFAULT.primaryColor,
        "primaryColor"
    )

    const bodyClassNames = [styles.darkBody]
    const sectionClassNames = [styles.darkSection]
    const buttonClassNames = [
        styles.darkBody,
        styles.darkButton,
        styles.greenBgOnHover,
        styles.greenColor,
    ]

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
