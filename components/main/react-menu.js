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

const Menu = ({ style } = {}) => {
    const { changeMenuState } = useContext(GlobalStateContext)

    return (
        <section
            onClick={() => changeMenuState("react")}
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
        </section>
    )
}

export default Menu
