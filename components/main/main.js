import styles from "./Styles.module.css"
import { useState, useEffect, useLayoutEffect } from "react"
import { CodeThemeProvider } from "providers/code-theme"
import Nav from "./navbar"
import { DivBg1 } from "../pretty-defaults"

/*
    ❗❗❗❗ IMPORTANT ❗❗❗❗
    the setVisible hack is important to address FOUC ( flash of unstyled content )
    DON'T REMOVE IT!
 */
const Home = ({ children } = {}) => {
    const [visible, setVisible] = useState(false)
    const useNextEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect
    useNextEffect(() => setVisible(true), [])

    return (
        <DivBg1
            className={styles.grid}
            style={{
                overflow: "auto",
                visibility: visible ? "visible" : "hidden",
            }}
        >
            <CodeThemeProvider>
                <Nav />
                <main className={styles.main}>{children}</main>
            </CodeThemeProvider>
        </DivBg1>
    )
}

export default Home
