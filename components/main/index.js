import styles from "./Styles.module.css"
import Nav from "./Nav"
import ReactMenu from "./ReactMenu"
import { useContext, useState } from "react"
import { ThemeContext } from "../../providers/theme/"

const NotesSection = ({ div1, div2, div3 }) => {
    const { sectionClassNames } = useContext(ThemeContext)
    const div1Styles = [styles.div1, ...sectionClassNames].join(" ")
    const div2Styles = [styles.div2, ...sectionClassNames].join(" ")
    const div3Styles = [styles.div3, ...sectionClassNames].join(" ")

    return (
        <>
            <section className={div1Styles}>{div1}</section>
            <section className={div2Styles}>{div2}</section>
            <section className={div3Styles}>{div3}</section>
        </>
    )
}

const Home = ({
    div1 = <div>Notes</div>,
    div2 = <div>Code Snippet</div>,
    div3 = <div>Preview</div>,
} = {}) => {
    let [show, setShow] = useState("notes")
    const { bodyClassNames } = useContext(ThemeContext)

    function toggleReactMenu() {
        setShow(show === "notes" ? "reactMenu" : "notes")
    }

    return (
        <div className={[styles.grid, ...bodyClassNames].join(" ")}>
            <Nav {...{ toggleReactMenu }} />
            <main className={styles.main}>
                {show === "reactMenu" ? <ReactMenu {...{ toggleReactMenu }} /> : null}
                <div
                    className={styles.notesLayout}
                    style={{ opacity: show === "notes" ? 1 : 0.1 }}
                >
                    <NotesSection {...{ div1, div2, div3 }} />
                </div>
            </main>
        </div>
    )
}
export default Home
