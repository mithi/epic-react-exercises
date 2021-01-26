import { createContext, useState } from "react"

const GlobalStateContext = createContext({})

const GlobalStateProvider = ({ children }) => {
    let [menuState, setMenuState] = useState("none", "menuState")

    const changeMenuState = menuType => {
        // when provided menuType is already the current menuState
        // then change it to "none"
        const nextState = menuType === menuState ? "none" : menuType
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
