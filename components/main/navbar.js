import styles from "./Styles.module.css"
import { GoOctoface } from "react-icons/go"
import { MdSettings } from "react-icons/md"
// import { BsThreeDots } from "react-icons/bs"
import { BiCoffeeTogo } from "react-icons/bi"
import { FaReact } from "react-icons/fa"
import { IconButton, LinkAwayIconButton } from "../button"
import { useContext } from "react"
import { GlobalStateContext } from "../../providers/global-state"
import { ThemeContext } from "../../providers/theme"
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
                    />
                    <IconButton
                        onClick={() => changeMenuState("theme")}
                        onMouseEnter={() => changeMenuState("theme")}
                        children={<MdSettings />}
                    />
                    <LinkAwayIconButton
                        page="https://github.com/mithi"
                        children={<GoOctoface />}
                    />
                    <LinkAwayIconButton
                        page="https://ko-fi.com/minimithi"
                        children={<BiCoffeeTogo />}
                    />
                </div>
            </nav>
        </>
    )
}

export default Nav
