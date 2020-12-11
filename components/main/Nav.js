import styles from "./Styles.module.css"
import { GoOctoface } from "react-icons/go"
import { MdSettings } from "react-icons/md"
// import { BsThreeDots } from "react-icons/bs"
import { BiCoffeeTogo } from "react-icons/bi"
import { FaReact } from "react-icons/fa"
import { IconButton } from "../button"
import { useContext } from "react"
import { ThemeContext } from "../../providers/theme/"

const Nav = ({ toggleReactMenu }) => {
    const { sectionClassNames } = useContext(ThemeContext)

    return (
        <nav className={[styles.nav, sectionClassNames].join(" ")}>
            <div className={styles.navButtonsContainer}>
                <IconButton
                    onClick={toggleReactMenu}
                    onMouseEnter={toggleReactMenu}
                    children={<FaReact />}
                />
                <IconButton children={<MdSettings />} />
                <IconButton children={<GoOctoface />} />
                <IconButton children={<BiCoffeeTogo />} />
            </div>
        </nav>
    )
}

export default Nav
