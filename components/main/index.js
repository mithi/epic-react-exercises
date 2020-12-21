import styles from "./Styles.module.css"
import Nav from "./navbar"
import { useContext } from "react"
import { ThemeContext } from "../../providers/theme"
import { GlobalStateContext } from "../../providers/global-state"

const Home = ({ children } = {}) => {
    const { bodyClassNames, bodyFont } = useContext(ThemeContext)
    const { menuState } = useContext(GlobalStateContext)

    return (
        <div
            className={[styles.grid, ...bodyClassNames].join(" ")}
            style={{ fontFamily: bodyFont }}
        >
            <Nav />
            <main
                className={styles.main}
                style={{ opacity: menuState === "none" ? 1.0 : 0.1 }}
            >
                {children}
            </main>
        </div>
    )
}
export default Home
