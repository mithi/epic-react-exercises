import { createContext, useContext } from "react"
import { useStickyState } from "hooks"
import styles from "./Theme.module.css"
import THEMES from "./THEMES"

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

const NUMBER_OF_THEMES = THEMES.length

/******************************
THEME
 ******************************/

const ThemeContext = createContext()

const ThemeProvider = ({ children }) => {
    const [themeId, setThemeId] = useStickyState(0, "themeId")
    const [colorId, setColorId] = useStickyState(0, "colorId")
    const [headerFontId, setHeaderFontId] = useStickyState(0, "headerId")
    const [bodyFontId, setBodyFontId] = useStickyState(0, "bodyFontId")
    const theme = THEMES[themeId]
    const bodyClassNames = [theme.body]
    const sectionClassNames = [theme.section]
    const onHoverClassName = colored(colorId).onHover

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
                colorId,
                nextBodyFont,
                nextPageTheme,
                nextColor,
                nextHeaderFont,
                bodyClassNames,
                sectionClassNames,
                onHoverClassName,
            }}
        >
            {children}
        </ThemeContext.Provider>
    )
}

/******************************
BUTTON THEME
 ******************************/

const ButtonThemeContext = createContext()

const ButtonThemeProvider = ({ children }) => {
    const { themeId, colorId } = useContext(ThemeContext)
    const theme = THEMES[themeId]
    const onHoverClassName = colored(colorId).onHover
    const buttonClassNames = [
        theme.button,
        onHoverClassName,
        colored(colorId).classColor,
        theme.buttonOnHover,
    ]
    const invertedButtonClassName = theme.invertedButton

    return (
        <ButtonThemeContext.Provider
            value={{
                buttonClassNames,
                invertedButtonClassName,
                disabledClassName: styles.disabled,
            }}
        >
            {children}
        </ButtonThemeContext.Provider>
    )
}

const useButtonThemeClasses = (className, disabled, isInvertedColor) => {
    const context = useContext(ButtonThemeContext)

    if (!context) {
        throw new Error(
            `hook: useButtonThemeClasses must be used within a provider: useButtonThemeProvider`
        )
    }

    const { buttonClassNames, invertedButtonClassName, disabledClassName } = context

    // invertedButtonClassName
    //      - normal, opacity: slightly less than 1.0
    //      - hovered, opacity: 1.0
    //      - backgroundColor: UNDEFINED
    //      - color: based on theme (light (white), dark (black), funky (red))
    // disabledClassName
    //     - normal: opacity: around 0.3
    //     - hovered: opacity: name as normal
    const [
        defaultBackground, // default button background color when not hovered (light (white), dark (black), funky (red))
        defaultColorOnHover, // default color of the element when hovered (light (white), dark (black), funky (red))
        defaultColor, // default color of element when not hovered (primaryColor)
        defaultBackgroundOnHover, // default background color when hovered (primary color)
    ] = buttonClassNames

    let final = isInvertedColor
        ? [invertedButtonClassName]
        : [defaultBackground, defaultColor]

    final = disabled
        ? [...final, disabledClassName]
        : [...final, defaultColorOnHover, defaultBackgroundOnHover]

    return [...final, className].join(" ")
}

export { ThemeProvider, ThemeContext, ButtonThemeProvider, useButtonThemeClasses }
