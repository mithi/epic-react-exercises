import styles from "./Styles.module.css"
import { GoOctoface } from "react-icons/go"
import { MdSettings } from "react-icons/md"
// import { BsThreeDots } from "react-icons/bs"
import { BiCoffeeTogo } from "react-icons/bi"
import { FaReact } from "react-icons/fa"
import { IconButton, LinkAwayIconButton } from "../button"
import { useContext } from "react"
import { ThemeContext } from "../../providers/theme"
import ReactMenu from "./react-menu"

const Nav = () => {
    const { sectionClassNames, flipFaded, showReactMenu } = useContext(ThemeContext)

    return (
        <nav className={[styles.nav, sectionClassNames].join(" ")}>
            {showReactMenu === "true" ? <ReactMenu /> : null}
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
    )
}

export default Nav
