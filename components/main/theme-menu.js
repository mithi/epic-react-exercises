import styles from "./Styles.module.css"
import { GlobalStateContext } from "../../providers/global-state"
import { ThemeContext } from "../../providers/theme"
import { useContext } from "react"
import { IconButton } from "../../components/button"
import { GiButtonFinger } from "react-icons/gi"
import { IoIosCloseCircle } from "react-icons/io"

const Menu = ({ style } = {}) => {
    const { changeMenuState } = useContext(GlobalStateContext)
    const { nextColor, nextHeaderFont, headerFont, nextBodyFont, bodyFont } = useContext(
        ThemeContext
    )

    return (
        <section className={styles.menu} style={{ paddingRight: "30px", ...style }}>
            <IconButton onClick={() => changeMenuState("theme")}>
                <IoIosCloseCircle />
            </IconButton>

            <IconButton onClick={nextColor}>
                <GiButtonFinger />
            </IconButton>
            <IconButton
                onClick={nextHeaderFont}
                style={{
                    width: "auto",
                    fontFamily: headerFont,
                    padding: "50px",
                    fontSize: "50px",
                    borderRadius: "20px",
                }}
            >
                Header!
            </IconButton>

            <IconButton
                onClick={nextBodyFont}
                style={{
                    width: "auto",
                    fontFamily: bodyFont,
                    padding: "30px",
                    borderRadius: "20px",
                    fontSize: "18px",
                }}
            >
                The quick brown fox jumps over the lazy dog.
            </IconButton>
        </section>
    )
}

export default Menu
