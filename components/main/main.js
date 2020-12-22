import styles from "./Styles.module.css"
import { useContext } from "react"
import { ThemeContext, GlobalStateContext } from "providers"
import Nav from "./navbar"

const Home = ({ children } = {}) => {
    const { bodyClassNames, bodyFont } = useContext(ThemeContext)
    const { menuState } = useContext(GlobalStateContext)

    return (
        <div
            className={[styles.grid, ...bodyClassNames].join(" ")}
            style={{ fontFamily: bodyFont, height: "100vh" }}
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
