import styles from "./Styles.module.css"
import { useState } from "react"
import Nav from "./Nav"
import ReactMenu from "./ReactMenu"

const NotesSection = ({ div1, div2, div3 }) => {
    return (
        <>
            <section className={styles.div1}>{div1}</section>
            <section className={styles.div2}>{div2}</section>
            <section className={styles.div3}>{div3}</section>
        </>
    )
}

const Home = ({
    div1 = <div>Notes</div>,
    div2 = <div>Code Snippet</div>,
    div3 = <div>Preview</div>,
} = {}) => {
    let [show, setShow] = useState("notes")
    function toggleReactMenu() {
        setShow(show === "notes" ? "reactMenu" : "notes")
    }

    return (
        <div className={styles.grid}>
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
