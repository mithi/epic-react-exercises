import styles from "./Styles.module.css"
import { useContext, useState, useEffect } from "react"
import { ThemeContext, GlobalStateContext } from "providers"
import Nav from "./navbar"

const Home = ({ children } = {}) => {
    const { bodyClassNames, bodyFont } = useContext(ThemeContext)
    const { menuState } = useContext(GlobalStateContext)
    const [visible, setVisible] = useState(false)

    useEffect(() => setVisible(true), [])

    return (
        <div
            className={[styles.grid, ...bodyClassNames].join(" ")}
            style={{
                overflow: "auto",
                fontFamily: bodyFont,
                visibility: visible ? "visible" : "hidden",
            }}
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
