import "@reach/dialog/styles.css"
import styles from "./Styles.module.css"
import { MenuStateProvider, useMenuState } from "providers"
import { DialogOverlay, DialogContent } from "@reach/dialog"
import { SquareButton } from "../button"
import { GoOctoface, MdSettings, BiCoffeeTogo, FaReact } from "../icons"
import { DivBg2 } from "../pretty-defaults"
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
            <DivBg2 Component="nav" style={{ padding: "0" }} className={styles.nav}>
                <div className={styles.navButtonsContainer}>
                    <SquareButton
                        side="large"
                        onClick={() => changeMenuState("react")}
                        aria-label="react menu"
                        title="react menu"
                        name="react menu"
                    >
                        <FaReact />
                    </SquareButton>
                    <SquareButton
                        side="large"
                        onClick={() => changeMenuState("theme")}
                        aria-label="theme menu"
                        title="theme menu"
                        name="theme menu"
                    >
                        <MdSettings />
                    </SquareButton>
                    <SquareButton
                        side="large"
                        href="https://github.com/mithi"
                        aria-label="follow me on github"
                        title="follow me on github"
                        name="follow me on github"
                    >
                        <GoOctoface />
                    </SquareButton>
                    <SquareButton
                        side="large"
                        href="https://ko-fi.com/minimithi"
                        aria-label="buy me a coffee"
                        title="buy me a coffee"
                        name="buy me a coffee"
                    >
                        <BiCoffeeTogo />
                    </SquareButton>
                </div>
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
