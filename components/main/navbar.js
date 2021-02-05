import "@reach/dialog/styles.css"
import styles from "./Styles.module.css"
import { MenuStateProvider } from "providers"
import { useTheme, useMenuState } from "hooks"
import { DialogOverlay, DialogContent } from "@reach/dialog"
import { GoOctoface } from "react-icons/go"
import { MdSettings } from "react-icons/md"
import { BiCoffeeTogo } from "react-icons/bi"
import { FaReact } from "react-icons/fa"
import { LinkOutButton, OnClickButton } from "../button"
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
    const { sectionClassNames } = useTheme()

    return (
        <>
            <nav className={[styles.nav, ...sectionClassNames].join(" ")}>
                <div className={styles.navButtonsContainer}>
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
                </div>
            </nav>
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
