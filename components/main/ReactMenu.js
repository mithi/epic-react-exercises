import styles from "./Styles.module.css"
import { FaTimesCircle } from "react-icons/fa"
import Link from "next/link"

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

const ReactMenu = ({ style, toggleReactMenu }) => (
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

export default ReactMenu
