import styles from "./Styles.module.css"
import { useContext } from "react"
import { GlobalStateContext, ThemeContext } from "providers"
import { LinkButton } from "../button"

const Button = ({ children, section }) => {
    const { headerFont } = useContext(ThemeContext)
    return (
        <div>
            <LinkButton
                {...{
                    children,
                    page: `/react/${section}`,
                    className: styles.reactMenuButton,
                    style: { fontFamily: headerFont },
                }}
            />
            <br />
        </div>
    )
}

const Menu = ({ style, showCloseButton = true } = {}) => {
    const { changeMenuState } = useContext(GlobalStateContext)
    const { primaryColor } = useContext(ThemeContext)
    const maybeCloseButton = showCloseButton ? (
        <a
            style={{
                color: primaryColor,
                marginTop: "5px",
                marginLeft: "10px",
                cursor: "pointer",
            }}
            href="#"
            onClick={() => changeMenuState("none")}
        >
            [close]
        </a>
    ) : null
    return (
        <section
            onClick={() => changeMenuState("none")}
            className={styles.menu}
            style={{ paddingRight: "30px", ...style }}
        >
            <Button section="fundamentals" children="1. React Fundamentals" />
            <Button section="hooks" children="2. React Hooks" />
            <Button section="patterns" children="3. Advanced React Patterns" />
            <Button section="advanced-hooks" children="4. Advanced Hooks" />
            <Button section="performance" children="5. React Performance" />
            <Button section="testing" children="6. Testing React Apps" />
            <Button section="suspense" children="7. React Suspense" />
            <Button section="app" children="8. Build Epic React App" />
            {maybeCloseButton}
        </section>
    )
}

export default Menu
