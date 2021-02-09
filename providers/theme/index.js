import { createContext } from "react"
import { useStickyState } from "hooks"
import styles from "./Theme.module.css"

export const NUMBER_OF_BODY_FONTS = 5
export const NUMBER_OF_HEADER_FONTS = 5

export const COLORS = ["blue", "pink", "green", "purple", "orange"]
export const NUMBER_OF_COLORS = COLORS.length

const colored = id => {
    return {
        onHover: styles[`${COLORS[id]}BgOnHover`],
        classColor: styles[`${COLORS[id]}Color`],
        var: `var(--${COLORS[id]}-0)`,
    }
}

const THEMES = [
    {
        body: styles.darkBody,
        section: styles.darkSection,
        button: styles.darkButton,
        buttonOnHover: styles.darkButtonOnHover,
        invertedButton: styles.invertedDarkButton,
    },
    {
        body: styles.lightBody,
        section: styles.lightSection,
        button: styles.lightButton,
        buttonOnHover: styles.lightButtonOnHover,
        invertedButton: styles.invertedLightButton,
    },
    {
        body: styles.funkyBody,
        section: styles.funkySection,
        button: styles.funkyButton,
        buttonOnHover: styles.funkyButtonOnHover,
        invertedButton: styles.invertedFunkyButton,
    },
]

const NUMBER_OF_THEMES = THEMES.length

const DEFAULT = {
    bodyFont: "var(--body-font-02)",
    headerFont: "var(--header-font-01)",
    primaryColor: colored(COLORS[0]).var,
}

const ThemeContext = createContext(DEFAULT)

const ThemeProvider = ({ children }) => {
    const [themeId, setThemeId] = useStickyState(0, "themeId")
    const [colorId, setColorId] = useStickyState(0, "colorId")
    const [headerFontId, setHeaderFontId] = useStickyState(0, "headerId")
    const [bodyFontId, setBodyFontId] = useStickyState(0, "bodyFontId")
    const theme = THEMES[themeId]
    const bodyClassNames = [theme.body]
    const sectionClassNames = [theme.section]
    const onHoverClassName = colored(colorId).onHover
    const buttonClassNames = [
        theme.button,
        onHoverClassName,
        colored(colorId).classColor,
        theme.buttonOnHover,
    ]
    const invertedButtonClassName = theme.invertedButton

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

    const nextPageTheme = () => {
        const n = (Number(themeId) + 1) % NUMBER_OF_THEMES
        setThemeId(n)
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
                themeId,
                nextBodyFont,
                nextPageTheme,
                nextColor,
                nextHeaderFont,
                bodyClassNames,
                sectionClassNames,
                buttonClassNames,
                invertedButtonClassName,
                onHoverClassName,
                disabledClassName: styles.disabled,
            }}
        >
            {children}
        </ThemeContext.Provider>
    )
}

export { ThemeProvider, ThemeContext }
