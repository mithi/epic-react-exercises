import { createContext } from "react"
import useStickyState from "hooks/useStickyState"

const GlobalStateContext = createContext({})

const GlobalStateProvider = ({ children }) => {
    let [menuState, setMenuState] = useStickyState("none", "menuState")

    const changeMenuState = menuType => {
        // if menuType === "none": menuState = "none"
        let nextState = "none"
        if (menuType === "react") {
            nextState = menuState !== "react" ? "react" : "none"
        } else if (menuType === "theme") {
            nextState = menuState !== "theme" ? "theme" : "none"
        }

        setMenuState(nextState)
    }

    return (
        <GlobalStateContext.Provider
            value={{
                menuState,
                changeMenuState,
            }}
        >
            {children}
        </GlobalStateContext.Provider>
    )
}

export { GlobalStateContext, GlobalStateProvider }
