import "@reach/dialog/styles.css"
import styles from "./Styles.module.css"
import { MenuStateProvider } from "providers"
import { useTheme, useMenuState } from "hooks"
import { DialogOverlay, DialogContent } from "@reach/dialog"
import { GoOctoface } from "react-icons/go"
import { MdSettings } from "react-icons/md"
import { BiCoffeeTogo } from "react-icons/bi"
import { FaReact } from "react-icons/fa"
import { IconButton, LinkAwayIconButton } from "../button"
import ReactMenu from "./react-menu"
import ThemeMenu from "./theme-menu"

const MenuModal = () => {
    const { changeMenuState, menuState } = useMenuState()
    return (
        <>
            <DialogOverlay
                isOpen={menuState === "theme"}
                onDismiss={() => changeMenuState("none")}
                style={{ background: "hsla(0, 0%, 0%, 0.75)" }}
            >
                <DialogContent
                    aria-label="theme-menu"
                    style={{ width: "100%", padding: 0 }}
                >
                    <ThemeMenu />
                </DialogContent>
            </DialogOverlay>
            <DialogOverlay
                isOpen={menuState === "react"}
                onDismiss={() => changeMenuState("none")}
                style={{ background: "hsla(0, 0%, 0%, 0.75)" }}
            >
                <DialogContent
                    aria-label="react-menu"
                    style={{ width: "100%", padding: 0 }}
                >
                    <ReactMenu />
                </DialogContent>
            </DialogOverlay>
        </>
    )
}
const NavInner = () => {
    const { changeMenuState } = useMenuState()
    const { sectionClassNames } = useTheme()

    return (
        <>
            <nav className={[styles.nav, ...sectionClassNames].join(" ")}>
                <div className={styles.navButtonsContainer}>
                    <IconButton
                        onClick={() => changeMenuState("react")}
                        aria-label={"react menu"}
                    >
                        <FaReact />
                    </IconButton>
                    <IconButton
                        onClick={() => changeMenuState("theme")}
                        aria-label={"theme menu"}
                    >
                        <MdSettings />
                    </IconButton>
                    <LinkAwayIconButton
                        href="https://github.com/mithi"
                        aria-label={"follow me on github"}
                    >
                        <GoOctoface />
                    </LinkAwayIconButton>
                    <LinkAwayIconButton
                        href="https://ko-fi.com/minimithi"
                        aria-label={"buy me a coffee"}
                    >
                        <BiCoffeeTogo />
                    </LinkAwayIconButton>
                </div>
            </nav>
            <MenuModal />
        </>
    )
}

const Nav = () => (
    <MenuStateProvider>
        <NavInner />
    </MenuStateProvider>
)
export default Nav
