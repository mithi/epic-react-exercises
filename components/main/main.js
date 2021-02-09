import styles from "./Styles.module.css"
import { useState, useEffect, useLayoutEffect } from "react"
import { useTheme } from "hooks"
import { CodeThemeProvider } from "providers/code-theme"
import Nav from "./navbar"

/*
    ❗❗❗❗ IMPORTANT ❗❗❗❗
    the setVisible hack is important to address FOUC ( flash of unstyled content )
    DON'T REMOVE IT!
 */
const Home = ({ children } = {}) => {
    const { bodyClassNames, bodyFont } = useTheme()
    const [visible, setVisible] = useState(false)
    const useNextEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect
    useNextEffect(() => setVisible(true), [])

    return (
        <div
            className={[styles.grid, ...bodyClassNames].join(" ")}
            style={{
                overflow: "auto",
                fontFamily: bodyFont,
                visibility: visible ? "visible" : "hidden",
            }}
        >
            <CodeThemeProvider>
                <Nav />
                <main className={styles.main}>{children}</main>
            </CodeThemeProvider>
        </div>
    )
}

export default Home
