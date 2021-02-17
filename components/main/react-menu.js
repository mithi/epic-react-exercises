import styles from "./Styles.module.css"
import { PlainButton } from "../button"
import { PrettyHeader, SimpleLink, OnClickText } from "../pretty-defaults"
import { useMenuState } from "hooks"

const Button = ({ children, section }) => {
    return (
        <PlainButton
            href={`/react/${section}/1`}
            style={{
                borderRadius: "10px",
                fontSize: "20px",
                padding: "16px",
                margin: "6px",
                textAlign: "left",
            }}
        >
            {children}
        </PlainButton>
    )
}

const Close = ({ onClick }) => (
    <OnClickText {...{ onClick, style: { margin: "5px 10px" } }}>[close]</OnClickText>
)

const Menu = ({ style, showCloseButton = true } = {}) => {
    const { changeMenuState } = useMenuState()
    return (
        <section
            onClick={() => changeMenuState("none")}
            className={styles.menu}
            style={{ paddingRight: "30px", ...style }}
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
            {showCloseButton ? <Close onClick={() => changeMenuState("none")} /> : null}
        </section>
    )
}

export default Menu
