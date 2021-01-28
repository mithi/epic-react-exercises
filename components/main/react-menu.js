import styles from "./Styles.module.css"
import { useContext } from "react"
import { GlobalStateContext } from "providers"
import { LinkButton } from "../button"
import { PrettyHeader, PrettyAnchor } from "../pretty-defaults"

const Button = ({ children, section }) => {
    return (
        <div>
            <LinkButton
                {...{
                    page: `/react/${section}`,
                    className: styles.reactMenuButton,
                }}
            >
                <PrettyHeader Component="span">{children}</PrettyHeader>
            </LinkButton>
            <br />
        </div>
    )
}

const Menu = ({ style, showCloseButton = true } = {}) => {
    const { changeMenuState } = useContext(GlobalStateContext)
    const maybeCloseButton = showCloseButton ? (
        <PrettyAnchor
            style={{ marginTop: "5px", marginLeft: "10px" }}
            href="#"
            onClick={() => changeMenuState("none")}
        >
            [close]
        </PrettyAnchor>
    ) : null
    return (
        <section
            onClick={() => changeMenuState("none")}
            className={styles.menu}
            style={{ paddingRight: "30px", ...style }}
        >
            <Button section="fundamentals" children="1. React Fundamentals" />
            <Button section="hooks" children="2. React Hooks" />
            <Button section="advanced-hooks" children="3. Advanced Hooks" />
            <Button section="patterns" children="4. Advanced React Patterns" />
            <Button section="performance" children="5. React Performance" />
            <Button section="testing" children="6. Testing React Apps" />
            <Button section="suspense" children="7. React Suspense" />
            <Button section="app" children="8. Build Epic React App" />
            {maybeCloseButton}
        </section>
    )
}

export default Menu
