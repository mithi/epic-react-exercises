import { createContext, useState } from "react"

const GlobalStateContext = createContext({})

const GlobalStateProvider = ({ children }) => {
    let [menuState, setMenuState] = useState("none", "menuState")

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
