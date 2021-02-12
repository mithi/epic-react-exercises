import { useContext } from "react"
import { ThemeContext, MenuStateContext } from "providers"

function useCustomContext(_context, name) {
    const context = useContext(_context)
    if (!context) {
        throw new Error(
            `hook: use${name} must be used within a provider: ${name}Provider`
        )
    }
    return context
}

function useTheme() {
    return useCustomContext(ThemeContext, "Theme")
}

function useMenuState() {
    return useCustomContext(MenuStateContext, "MenuState")
}

export { useTheme, useMenuState }
