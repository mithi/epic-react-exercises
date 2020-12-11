import styles from "./Styles.module.css"
import { FaTimesCircle } from "react-icons/fa"
import { LinkButton, IconButton } from "../button"

const Button = ({
    text,
    page,
    style = {
        fontSize: "1.25rem",
        fontFamily: "var(--header-font-00)",
        borderRadius: "15px",
        padding: "10px",
    },
} = {}) => (
    <>
        <LinkButton {...{ text, page: `/react/${page}`, style }} /> <br />
    </>
)

const Menu = ({ toggleReactMenu, style } = {}) => (
    <section className={styles.mainReactMenu} style={{ paddingRight: "30px", ...style }}>
        <IconButton onClick={toggleReactMenu} style={{ margin: 0 }}>
            <FaTimesCircle />
        </IconButton>
        <br />
        <Button page="fundamentals" text="1. React Fundamentals" />
        <Button page="hooks" text="2. React Hooks" />
        <Button page="patterns" text="3. Advanced React Patterns" />
        <Button page="advanced-hooks" text="4. Advanced Hooks" />
        <Button page="performance" text="5. React Performance" />
        <Button page="testing" text="6. Testing React Apps" />
        <Button page="suspense" text="7. React Suspense" />
        <Button page="app" text="8. Building an Epic React App" />
    </section>
)

export default Menu
