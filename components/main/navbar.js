import styles from "./Styles.module.css"
import { useContext } from "react"
import { GoOctoface } from "react-icons/go"
import { MdSettings } from "react-icons/md"
import { BiCoffeeTogo } from "react-icons/bi"
import { FaReact } from "react-icons/fa"
import { GlobalStateContext, ThemeContext } from "providers"

import { IconButton, LinkAwayIconButton } from "../button"
import ReactMenu from "./react-menu"
import ThemeMenu from "./theme-menu"

const Nav = () => {
    const { changeMenuState, menuState } = useContext(GlobalStateContext)
    const { sectionClassNames } = useContext(ThemeContext)

    return (
        <>
            {menuState === "theme" ? <ThemeMenu /> : null}
            {menuState === "react" ? <ReactMenu /> : null}
            <nav className={[styles.nav, ...sectionClassNames].join(" ")}>
                <div className={styles.navButtonsContainer}>
                    <IconButton
                        onClick={() => changeMenuState("react")}
                        onMouseEnter={() => changeMenuState("react")}
                        children={<FaReact />}
                        aria-label={"react menu"}
                    />
                    <IconButton
                        onClick={() => changeMenuState("theme")}
                        onMouseEnter={() => changeMenuState("theme")}
                        aria-label={"theme menu"}
                        children={<MdSettings />}
                    />
                    <LinkAwayIconButton
                        page="https://github.com/mithi"
                        children={<GoOctoface />}
                        aria-label={"follow me on github"}
                    />
                    <LinkAwayIconButton
                        page="https://ko-fi.com/minimithi"
                        children={<BiCoffeeTogo />}
                        aria-label={"buy me a coffee"}
                    />
                </div>
            </nav>
        </>
    )
}

export default Nav
