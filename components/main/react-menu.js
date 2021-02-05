import styles from "./Styles.module.css"
import { LinkButton } from "../button"
import { PrettyHeader, PrettyLink, OnClickText } from "../pretty-defaults"
import { useMenuState } from "hooks"

const Button = ({ children, section }) => {
    return (
        <LinkButton
            {...{
                href: `/react/${section}`,
                style: {
                    width: "auto",
                    height: "auto",
                    borderRadius: "15px",
                    padding: "20px",
                    margin: "5px",
                    textAlign: "left",
                    lineHeight: "1",
                },
            }}
        >
            {children}
        </LinkButton>
    )
}

const REACT_MENU_HEADER = (
    <PrettyHeader Component="h1" style={{ fontSize: "15px", margin: "10px" }}>
        <PrettyLink style={{ marginTop: "5px", marginLeft: "10px" }} href="/react">
            (React Menu)
        </PrettyLink>
    </PrettyHeader>
)

const Close = ({ onClick }) => (
    <OnClickText {...{ onClick, style: { marginTop: "5px", marginLeft: "10px" } }}>
        [close]
    </OnClickText>
)

const Menu = ({ style, showCloseButton = true } = {}) => {
    const { changeMenuState } = useMenuState()

    return (
        <section
            onClick={() => changeMenuState("none")}
            className={styles.menu}
            style={{ paddingRight: "30px", ...style }}
        >
            {REACT_MENU_HEADER}

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
