import styles from "./Styles.module.css"
import { useState, useEffect } from "react"
import { CodeThemeProvider } from "providers/code-theme"
import Nav from "./navbar"
import { SpinnerDots } from "../spinner"
import { DivBg1 } from "../pretty-defaults"

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
    const hasMounted = useHasMounted()

    if (!hasMounted) {
        return <SpinnerDots />
    }

    return (
        <DivBg1
            className={styles.grid}
            style={{
                overflow: "auto",
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
