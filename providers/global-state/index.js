import { createContext } from "react"
import useStickyState from "../../hooks/useStickyState"

const GlobalStateContext = createContext({})

const GlobalStateProvider = ({ children }) => {
    let [primarySection, setPrimarySection] = useStickyState("notes", "mode")
    let [fadeMain, setFadeMain] = useStickyState("false", "fadeMain")
    let [showReactMenu, setShowReactMenu] = useStickyState("false", "showReactMenu")

    const togglePrimarySection = () => {
        setPrimarySection(primarySection === "notes" ? "code" : "notes", "mode")
    }

    const flipFaded = () => {
        if (showReactMenu === "true") {
            setFadeMain("false")
            setShowReactMenu("false")
        }

        if (showReactMenu === "false") {
            setFadeMain("true")
            setShowReactMenu("true")
        }
    }

    return (
        <GlobalStateContext.Provider
            value={{
                primarySection,
                togglePrimarySection,
                fadeMain,
                showReactMenu,
                flipFaded,
            }}
        >
            {children}
        </GlobalStateContext.Provider>
    )
}

export { GlobalStateContext, GlobalStateProvider }
