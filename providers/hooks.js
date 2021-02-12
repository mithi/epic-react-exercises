import { useContext } from "react"
import { MenuStateContext } from "providers"
import { useTheme } from "providers/theme"

function useCustomContext(_context, name) {
    const context = useContext(_context)
    if (!context) {
        throw new Error(
            `hook: use${name} must be used within a provider: ${name}Provider`
        )
    }
    return context
}

function useMenuState() {
    return useCustomContext(MenuStateContext, "MenuState")
}

export { useTheme, useMenuState }
