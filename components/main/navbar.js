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

const Nav = () => {
    const { flipFaded, showReactMenu } = useContext(GlobalStateContext)
    const { sectionClassNames } = useContext(ThemeContext)

    return (
        <>
            {showReactMenu === "true" ? <ReactMenu /> : null}
            <nav className={[styles.nav, ...sectionClassNames].join(" ")}>
                <div className={styles.navButtonsContainer}>
                    <IconButton
                        onClick={flipFaded}
                        onMouseEnter={flipFaded}
                        children={<FaReact />}
                    />
                    <IconButton children={<MdSettings />} />
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
