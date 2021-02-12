import { useContext } from "react"
import { ThemeContext, MenuStateContext } from "providers"
import useStickyState from "./use-sticky-state"
import useAsync from "./use-async"
import useHasMounted from "./use-has-mounted"

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

export { useStickyState, useTheme, useMenuState, useAsync, useHasMounted }
