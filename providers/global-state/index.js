import { createContext } from "react"
import useStickyState from "hooks/useStickyState"

const GlobalStateContext = createContext({})

const GlobalStateProvider = ({ children }) => {
    let [primarySection, setPrimarySection] = useStickyState("notes", "mode")
    let [menuState, setMenuState] = useStickyState("none")

    const togglePrimarySection = () => {
        setPrimarySection(primarySection === "notes" ? "code" : "notes", "mode")
    }

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
                primarySection,
                togglePrimarySection,
                menuState,
                changeMenuState,
            }}
        >
            {children}
        </GlobalStateContext.Provider>
    )
}

export { GlobalStateContext, GlobalStateProvider }
