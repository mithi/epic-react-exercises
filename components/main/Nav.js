import styles from "./Styles.module.css"
import { GoOctoface } from "react-icons/go"
import { MdSettings } from "react-icons/md"
// import { BsThreeDots } from "react-icons/bs"
import { BiCoffeeTogo } from "react-icons/bi"
import { FaReact } from "react-icons/fa"

const Nav = ({ toggleReactMenu }) => (
    <nav className={styles.nav}>
        <div className={styles.navButtonsContainer}>
            <button
                className={styles.buttonIcon}
                onClick={toggleReactMenu}
                onMouseEnter={toggleReactMenu}
            >
                <FaReact />
            </button>
            <button className={styles.buttonIcon}>
                <MdSettings />
            </button>
            <button className={styles.buttonIcon}>
                <GoOctoface />
            </button>
            <button className={styles.buttonIcon}>
                <BiCoffeeTogo />
            </button>
        </div>
    </nav>
)

export default Nav
