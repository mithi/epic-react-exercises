import styles from "./Styles.module.css"
import { useContext, useState, useEffect } from "react"
import { ThemeContext, GlobalStateContext } from "providers"
import Nav from "./navbar"

const Home = ({ children } = {}) => {
    const { bodyClassNames, bodyFont } = useContext(ThemeContext)
    return (
        <div
            className={[styles.grid, ...bodyClassNames].join(" ")}
            style={{
                overflow: "auto",
                fontFamily: bodyFont,
            }}
        >
            <Nav />
            <main className={styles.main}>{children}</main>
        </div>
    )
}
export default Home
