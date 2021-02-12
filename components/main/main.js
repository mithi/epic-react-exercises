import styles from "./Styles.module.css"
import { useState, useEffect } from "react"
import { useTheme } from "hooks"
import { CodeThemeProvider } from "providers/code-theme"
import Nav from "./navbar"

function useHasMounted() {
    const [hasMounted, setHasMounted] = useState(false)

    useEffect(() => {
        setHasMounted(true)
    }, [])
    return hasMounted
}

/*
    ❗❗❗❗ IMPORTANT ❗❗❗❗
    hasMounted is important to address FOUC ( flash of unstyled content )
    DON'T REMOVE IT!
 */
const Home = ({ children } = {}) => {
    const { bodyClassNames, bodyFont } = useTheme()
    const hasMounted = useHasMounted()

    if (!hasMounted) {
        return null
    }

    return (
        <div
            className={[styles.grid, ...bodyClassNames].join(" ")}
            style={{
                overflow: "auto",
                fontFamily: bodyFont,
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
