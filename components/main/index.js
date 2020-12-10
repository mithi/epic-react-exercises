import styles from "./Styles.module.css"
import { GoOctoface } from "react-icons/go"
import { MdSettings } from "react-icons/md"
// import { BsThreeDots } from "react-icons/bs"
import { BiCoffeeTogo } from "react-icons/bi"
import { useState } from "react"
import { FaTimesCircle, FaReact } from "react-icons/fa"
import Link from "next/link"

const Nav = ({ toggleReactMenu }) => (
    <nav className={styles.nav}>
        <div className={styles.navButtonsContainer}>
            <button
                className={styles.buttonIcon}
                onClick={toggleReactMenu}
                onMouseEnter={toggleReactMenu}
            >
                <FaReact />
            </button>
            <button className={styles.buttonIcon}>
                <MdSettings />
            </button>
            <button className={styles.buttonIcon}>
                <GoOctoface />
            </button>
            <button className={styles.buttonIcon}>
                <BiCoffeeTogo />
            </button>
        </div>
    </nav>
)

const NotesSection = ({ preview, snippet, notes }) => {
    return (
        <>
            <section className={styles.div2}>{preview}</section>
            <section className={styles.div3}>{snippet}</section>
            <section className={styles.div1}>{notes}</section>
        </>
    )
}

const ReactMenuButton = ({ text, page }) => (
    <>
        <Link href={`/react/${page}`}>
            <a>
                <button className={styles.buttonText}>{text}</button>
            </a>
        </Link>
        <br />
    </>
)

const MainMenu = ({ style, toggleReactMenu }) => (
    <section className={styles.mainReactMenu} style={{ paddingRight: "30px", ...style }}>
        <button
            onClick={toggleReactMenu}
            className={styles.buttonIcon}
            style={{ margin: 0 }}
        >
            <FaTimesCircle />
        </button>
        <br />
        <ReactMenuButton page="fundamentals" text="1. React Fundamentals" />
        <ReactMenuButton page="hooks" text="2. React Hooks" />
        <ReactMenuButton page="patterns" text="3. Advanced React Patterns" />
        <ReactMenuButton page="advanced-hooks" text="4. Advanced Hooks" />
        <ReactMenuButton page="performance" text="5. React Performance" />
        <ReactMenuButton page="testing" text="6. Testing React Apps" />
        <ReactMenuButton page="suspense" text="7. React Suspense" />
        <ReactMenuButton page="app" text="8. Building an Epic React App" />
    </section>
)

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
                <MainMenu
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
