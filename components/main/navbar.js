import "@reach/dialog/styles.css"
import styles from "./Styles.module.css"
import { MenuStateProvider } from "providers"
import { useMenuState } from "providers/hooks"
import { DialogOverlay, DialogContent } from "@reach/dialog"
import { LinkOutButton, OnClickButton } from "../button"
import { DivBg2 } from "../pretty-defaults"
import { GoOctoface, MdSettings, BiCoffeeTogo, FaReact } from "../icons"
import ReactMenu from "./react-menu"
import ThemeMenu from "./theme-menu"

const Dialog = ({ onDismiss, isOpen, label, children }) => (
    <DialogOverlay
        {...{ isOpen, onDismiss }}
        style={{ background: "hsla(0, 0%, 0%, 0.75)" }}
    >
        <DialogContent aria-label={label} style={{ width: "100%", padding: 0 }}>
            {children}
        </DialogContent>
    </DialogOverlay>
)

const NavInner = () => {
    const { changeMenuState, menuState } = useMenuState()

    return (
        <>
            <DivBg2 className={styles.nav}>
                <nav className={styles.navButtonsContainer}>
                    <OnClickButton
                        onClick={() => changeMenuState("react")}
                        aria-label="react menu"
                    >
                        <FaReact />
                    </OnClickButton>
                    <OnClickButton
                        onClick={() => changeMenuState("theme")}
                        aria-label="theme menu"
                    >
                        <MdSettings />
                    </OnClickButton>
                    <LinkOutButton
                        href="https://github.com/mithi"
                        aria-label="follow me on github"
                    >
                        <GoOctoface />
                    </LinkOutButton>
                    <LinkOutButton
                        href="https://ko-fi.com/minimithi"
                        aria-label="buy me a coffee"
                    >
                        <BiCoffeeTogo />
                    </LinkOutButton>
                </nav>
            </DivBg2>
            <Dialog
                onDismiss={() => changeMenuState("none")}
                isOpen={menuState === "theme"}
                label="theme menu"
            >
                <ThemeMenu />
            </Dialog>
            <Dialog
                onDismiss={() => changeMenuState("none")}
                isOpen={menuState === "react"}
                label="react menu"
            >
                <ReactMenu />
            </Dialog>
        </>
    )
}

const Nav = () => (
    <MenuStateProvider>
        <NavInner />
    </MenuStateProvider>
)
export default Nav
