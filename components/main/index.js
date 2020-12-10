import styles from "./Styles.module.css"
import { useState } from "react"
import { FaTimesCircle } from "react-icons/fa"
import Link from "next/link"
import Nav from "./Nav"
import ReactMenu from "./ReactMenu"

const NotesSection = ({ preview, snippet, notes }) => {
    return (
        <>
            <section className={styles.div2}>{preview}</section>
            <section className={styles.div3}>{snippet}</section>
            <section className={styles.div1}>{notes}</section>
        </>
    )
}

const Home = ({
    preview = <div>preview</div>,
    notes = <div>Notes</div>,
    snippet = <div>snippet</div>,
} = {}) => {
    let [show, setShow] = useState("notes")
    function toggleReactMenu() {
        setShow(show === "notes" ? "reactMenu" : "notes")
    }

    return (
        <div className={styles.grid}>
            <Nav {...{ toggleReactMenu }} />
            <main className={styles.main}>
                <ReactMenu
                    style={{ opacity: show === "reactMenu" ? 1 : 0 }}
                    {...{ toggleReactMenu }}
                />
                <div
                    className={styles.notesLayout}
                    style={{ opacity: show === "notes" ? 1 : 0.1 }}
                >
                    <NotesSection {...{ preview, notes, snippet }} />
                </div>
            </main>
        </div>
    )
}
export default Home
