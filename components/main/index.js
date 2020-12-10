import styles from "./Styles.module.css"
import { GoOctoface } from "react-icons/go"
import { MdSettings } from "react-icons/md"
import { BsThreeDots } from "react-icons/bs"
import { BiCoffeeTogo } from "react-icons/bi"

const Nav = () => (
    <nav className={styles.nav}>
        <div className={styles.navButtonsContainer}>
            <button className={styles.buttonIcon}>
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
                Preview<p class={styles.paragraph}>There is no preview to display</p>
            </section>
            <section className={styles.div3}>
                Code Snippet<p>There is no code snippet to display</p>
            </section>
            <section className={styles.div1}>Notes</section>
        </>
    )
}

const MainMenu = () => (
    <section
        className={styles.div1}
        style={{
            position: "absolute",
            top: 0,
            left: "70px",
            background: "rgba(0, 0, 0, 0)",
            zIndex: 1,
        }}
    >
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
    return (
        <div className={styles.grid}>
            <Nav />
            <main className={styles.main}>
                <MainMenu />
                <div className={styles.notesLayout} style={{ opacity: 0.0 }}>
                    <NotesSection />
                </div>
            </main>
        </div>
    )
}
export default Home
