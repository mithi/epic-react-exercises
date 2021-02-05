import styles from "./Styles.module.css"
import { LinkButton } from "../button"
import { PrettyHeader, PrettyLink, OnClickText } from "../pretty-defaults"
import { useMenuState } from "hooks"

const Button = ({ children, section }) => {
    return (
        <div>
            <LinkButton
                {...{
                    href: `/react/${section}`,
                    className: styles.reactMenuButton,
                    style: {
                        width: "auto",
                        height: "auto",
                        borderRadius: "15px",
                        margin: "0px",
                    },
                }}
            >
                <PrettyHeader Component="span">{children}</PrettyHeader>
            </LinkButton>
            <br />
        </div>
    )
}

const Menu = ({ style, showCloseButton = true } = {}) => {
    const { changeMenuState } = useMenuState()

    const maybeCloseButton = showCloseButton ? (
        <OnClickText
            style={{ marginTop: "5px", marginLeft: "10px" }}
            onClick={() => changeMenuState("none")}
        >
            [close]
        </OnClickText>
    ) : null
    return (
        <section
            onClick={() => changeMenuState("none")}
            className={styles.menu}
            style={{ paddingRight: "30px", ...style }}
        >
            {/** for accessibility **/}
            <PrettyHeader Component="h1" style={{ fontSize: "15px", margin: "10px" }}>
                <PrettyLink style={{ marginTop: "5px", marginLeft: "10px" }} href="/">
                    (React Menu)
                </PrettyLink>
            </PrettyHeader>

            <Button section="fundamentals">1. React Fundamentals</Button>
            <Button section="hooks">2. React Hooks</Button>
            <Button section="advanced-hooks">3. Advanced Hooks</Button>
            <Button section="patterns">Advanced React Patterns</Button>
            <Button section="performance">5. React Performance</Button>
            <Button section="testing">Testing React Apps</Button>
            <Button section="suspense">7. React Suspense</Button>
            <Button section="app"> 8. Build Epic React App</Button>
            {maybeCloseButton}
        </section>
    )
}

export default Menu
