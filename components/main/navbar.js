import "@reach/dialog/styles.css"
import styles from "./Styles.module.css"
import { useTheme, useGlobalState } from "hooks"
import { DialogOverlay, DialogContent } from "@reach/dialog"
import { GoOctoface } from "react-icons/go"
import { MdSettings } from "react-icons/md"
import { BiCoffeeTogo } from "react-icons/bi"
import { FaReact } from "react-icons/fa"

import { IconButton, LinkAwayIconButton } from "../button"
import ReactMenu from "./react-menu"
import ThemeMenu from "./theme-menu"

const MenuModal = () => {
    const { changeMenuState, menuState } = useGlobalState()
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
const Nav = () => {
    const { changeMenuState } = useGlobalState()
    const { sectionClassNames } = useTheme()

    return (
        <>
            <nav className={[styles.nav, ...sectionClassNames].join(" ")}>
                <div className={styles.navButtonsContainer}>
                    <IconButton
                        onClick={() => changeMenuState("react")}
                        children={<FaReact />}
                        aria-label={"react menu"}
                    />
                    <IconButton
                        onClick={() => changeMenuState("theme")}
                        aria-label={"theme menu"}
                        children={<MdSettings />}
                    />
                    <LinkAwayIconButton
                        page="https://github.com/mithi"
                        children={<GoOctoface />}
                        aria-label={"follow me on github"}
                    />
                    <LinkAwayIconButton
                        page="https://ko-fi.com/minimithi"
                        children={<BiCoffeeTogo />}
                        aria-label={"buy me a coffee"}
                    />
                </div>
            </nav>
            <MenuModal />
        </>
    )
}

export default Nav
