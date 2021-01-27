import styles from "./Styles.module.css"
import { useContext, useState, useEffect } from "react"
import { ThemeContext } from "providers"
import Nav from "./navbar"

/*
    ❗❗❗❗ IMPORTANT ❗❗❗❗
    the setVisible hack is important to address FOUC ( flash of unstyled content )
    DON'T REMOVE IT!
 */
const Home = ({ children } = {}) => {
    const { bodyClassNames, bodyFont } = useContext(ThemeContext)
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
            <main className={styles.main}>{children}</main>
        </div>
    )
}
export default Home
