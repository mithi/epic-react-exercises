import styles from "./Styles.module.css"
import Nav from "./navbar"
import { useContext } from "react"
import { ThemeContext } from "../../providers/theme"

const Home = ({ children } = {}) => {
    const { bodyClassNames, bodyFont } = useContext(ThemeContext)
    return (
        <div
            className={[styles.grid, ...bodyClassNames].join(" ")}
            style={{ fontFamily: bodyFont }}
        >
            <Nav />
            <main className={styles.main}>{children}</main>
        </div>
    )
}
export default Home
