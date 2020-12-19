import styles from "./Styles.module.css"
import { LinkButton } from "../button"
import { GlobalStateContext } from "../../providers/global-state"
import { useContext } from "react"

const BUTTON_STYLE = {
    fontSize: "1.25rem",
    fontFamily: "var(--header-font-00)",
    borderRadius: "15px",
    padding: "15px",
    margin: "0",
    marginBottom: "15px",
}

const Button = ({ children, section, style = BUTTON_STYLE } = {}) => (
    <div>
        <LinkButton {...{ children, page: `/react/${section}`, style }} /> <br />
    </div>
)

const Menu = ({ style } = {}) => {
    const { flipFaded } = useContext(GlobalStateContext)

    return (
        <section
            onClick={flipFaded}
            className={styles.mainReactMenu}
            style={{ paddingRight: "30px", ...style }}
        >
            <Button section="fundamentals" children="1. React Fundamentals" />
            <Button section="hooks" children="2. React Hooks" />
            <Button section="patterns" children="3. Advanced React Patterns" />
            <Button section="advanced-hooks" children="4. Advanced Hooks" />
            <Button section="performance" children="5. React Performance" />
            <Button section="testing" children="6. Testing React Apps" />
            <Button section="suspense" children="7. React Suspense" />
            <Button section="app" children="8. Building an Epic React App" />
        </section>
    )
}

export default Menu
