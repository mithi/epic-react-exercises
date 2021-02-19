import styles from "./Styles.module.css"
import { PlainButton } from "../button"
import { PrettyHeader, SimpleLink, OnClickText } from "../pretty-defaults"
import { useMenuState } from "providers"

const Button = ({ children, section }) => {
    return (
        <PlainButton
            href={`/react/${section}/1`}
            style={{ padding: "15px", margin: "6px", fontSize: "18px" }}
            className={styles.reactMenuButton}
        >
            {children}
        </PlainButton>
    )
}

const Menu = ({ showCloseButton = true } = {}) => {
    const { changeMenuState } = useMenuState()

    return (
        <section
            onClick={() => changeMenuState("none")}
            className={styles.menu}
            style={{ textAlign: "left", zIndex: showCloseButton ? 1 : 0 }}
        >
            <PrettyHeader Component="h1" style={{ fontSize: "15px", margin: "0px 10px" }}>
                <SimpleLink href="/react">(React Menu)</SimpleLink>
            </PrettyHeader>
            <Button section="fundamentals">1. React Fundamentals</Button>
            <Button section="hooks">2. React Hooks</Button>
            <Button section="advanced-hooks">3. Advanced React Hooks</Button>
            <Button section="patterns">4. Advanced React Patterns</Button>
            <Button section="performance">5. React Performance</Button>
            <Button section="testing">6. Testing React Apps</Button>
            <Button section="suspense">7. React Suspense</Button>
            <Button section="app"> 8. Build an Epic React App</Button>
            {showCloseButton && (
                <OnClickText
                    onClick={() => changeMenuState("none")}
                    style={{ margin: "6px 10px", textAlign: "left" }}
                >
                    [close]
                </OnClickText>
            )}
        </section>
    )
}

export default Menu
