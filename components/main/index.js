import styles from "./Styles.module.css"
import { GoOctoface } from "react-icons/go"
import { MdSettings } from "react-icons/md"
import { BsThreeDots } from "react-icons/bs"
import { BiCoffeeTogo } from "react-icons/bi"
import { useState } from "react"
import { FaTimesCircle } from "react-icons/fa"
const Nav = ({ toggleReactMenu }) => (
    <nav className={styles.nav}>
        <div className={styles.navButtonsContainer}>
            <button
                className={styles.buttonIcon}
                onClick={toggleReactMenu}
                onMouseEnter={toggleReactMenu}
            >
                <BsThreeDots />
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

const NotesSection = () => {
    return (
        <>
            <section className={styles.div2}>
                Preview<p className={styles.paragraph}>There is no preview to display</p>
            </section>
            <section className={styles.div3}>
                Code Snippet<p>There is no code snippet to display</p>
            </section>
            <section className={styles.div1}>Notes</section>
        </>
    )
}

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
        <button className={styles.buttonText}>1. React Fundamentals </button>
        <br />
        <button className={styles.buttonText}>2. React Hooks </button> <br />
        <button className={styles.buttonText}>3. Advanced React Hooks</button>
        <br />
        <button className={styles.buttonText}>4. Advanced React Patterns</button>
        <br />
        <button className={styles.buttonText}>5. React Performance </button>
        <br />
        <button className={styles.buttonText}>6. Testing React Apps </button>
        <br />
        <button className={styles.buttonText}>7. React Suspense </button> <br />
        <button className={styles.buttonText}>8. Build an Epic React App </button>
        <br />
    </section>
)

const Home = () => {
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
                    style={{ opacity: show === "notes" ? 1 : 0.3 }}
                >
                    <NotesSection />
                </div>
            </main>
        </div>
    )
}
export default Home
