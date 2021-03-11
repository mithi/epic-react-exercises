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

const labelProps = name => {
    return { "aria-label": name, "title": name, name }
}

const NavInner = () => {
    const { changeMenuState, menuState } = useMenuState()
    const iProps = { style: { margin: "5px 10px" }, side: "large" }
    return (
        <>
            <DivBg2 Component="nav" style={{ padding: "0" }} className={styles.nav}>
                <div className={styles.navButtonsContainer}>
                    <SquareButton
                        onClick={() => changeMenuState("react")}
                        {...labelProps("react menu")}
                        {...iProps}
                    >
                        <FaReact />
                    </SquareButton>
                    <SquareButton
                        onClick={() => changeMenuState("theme")}
                        {...labelProps("theme menu")}
                        {...iProps}
                    >
                        <MdSettings />
                    </SquareButton>
                    <SquareButton
                        href="https://github.com/mithi"
                        {...labelProps("follow me on github")}
                        {...iProps}
                    >
                        <GoOctoface />
                    </SquareButton>
                    <SquareButton
                        href="https://ko-fi.com/minimithi"
                        {...labelProps("buy me a coffee")}
                        {...iProps}
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
