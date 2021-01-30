import { createContext, useEffect, useState } from "react"

const MenuStateContext = createContext({})

const MenuStateProvider = ({ children }) => {
    let [menuState, setMenuState] = useState("none", "menuState")

    const changeMenuState = menuType => {
        // when provided menuType is already the current menuState
        // then change it to "none"
        const nextState = menuType === menuState ? "none" : menuType
        setMenuState(nextState)
    }

    return (
        <MenuStateContext.Provider
            value={{
                menuState,
                changeMenuState,
            }}
        >
            {children}
        </MenuStateContext.Provider>
    )
}

export { MenuStateContext, MenuStateProvider }
