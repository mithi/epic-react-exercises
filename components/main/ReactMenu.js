import styles from "./Styles.module.css"
import { FaTimesCircle } from "react-icons/fa"
import { LinkButton, IconButton } from "../button"

const Button = ({
    children,
    page,
    style = {
        fontSize: "1.25rem",
        fontFamily: "var(--header-font-00)",
        borderRadius: "15px",
        padding: "15px",
        margin: "0",
    },
} = {}) => (
    <>
        <LinkButton {...{ children, page: `/react/${page}`, style }} /> <br />
    </>
)

const Menu = ({ toggleReactMenu, style } = {}) => (
    <section className={styles.mainReactMenu} style={{ paddingRight: "30px", ...style }}>
        <IconButton onClick={toggleReactMenu} style={{ margin: 0 }}>
            <FaTimesCircle />
        </IconButton>
        <br />
        <Button page="fundamentals" children="1. React Fundamentals" />
        <Button page="hooks" children="2. React Hooks" />
        <Button page="patterns" children="3. Advanced React Patterns" />
        <Button page="advanced-hooks" children="4. Advanced Hooks" />
        <Button page="performance" children="5. React Performance" />
        <Button page="testing" children="6. Testing React Apps" />
        <Button page="suspense" children="7. React Suspense" />
        <Button page="app" children="8. Building an Epic React App" />
    </section>
)

export default Menu
