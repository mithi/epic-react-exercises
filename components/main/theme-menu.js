import styles from "./Styles.module.css"
import { useTheme, useMenuState } from "providers/hooks"
import { OnClickButton } from "../button"
import { OnClickText, PrettyHeader, DivBg1, DivBg2 } from "../pretty-defaults"
import { FaCloudSun, FaPaintBrush, CgFormatColor, BiText } from "../icons"

const ICON_BUTTON_STYLE = { margin: "10px 5px" }
const ICONS_CONTAINER_STYLE = {
    margin: "5px",
    padding: "5px",
    borderRadius: "15px",
    display: "flex",
    justifyContent: "center",
}
const PARAGRAPH_STYLE = {
    padding: "10px",
    borderRadius: "5px",
    lineHeight: "1.3",
    margin: "10px",
    marginTop: "0",
}
const HEADER_STYLE = {
    padding: "10px",
    borderRadius: "5px",
    margin: "10px",
    marginBottom: "0",
}

const COLOR_LINE_STYLE = { width: "100%", height: "5px" }

const SquareIcon = ({ onClick, children, ...otherProps }) => (
    <OnClickButton style={ICON_BUTTON_STYLE} {...{ onClick, ...otherProps }}>
        {children}
    </OnClickButton>
)

const ChooseThemeIcons = () => {
    const { nextColor, nextHeaderFont, nextBodyFont, nextPageTheme } = useTheme()

    return (
        <DivBg2 style={ICONS_CONTAINER_STYLE}>
            <SquareIcon onClick={nextPageTheme} aria-label="change page theme">
                <FaCloudSun />
            </SquareIcon>
            <SquareIcon onClick={nextColor} aria-label="change main color">
                <FaPaintBrush />
            </SquareIcon>
            <SquareIcon onClick={nextHeaderFont} aria-label="change header font">
                <CgFormatColor />
            </SquareIcon>
            <SquareIcon onClick={nextBodyFont} aria-label="change body font">
                <BiText />
            </SquareIcon>
        </DivBg2>
    )
}

const ChooseTheme = () => {
    const themes = ["(dark) 🌙", "(light) 🔆", "(funky) 🏖️"]
    const { themeId } = useTheme()

    return (
        <PrettyHeader Component="h1" style={{ fontSize: "15px", margin: "10px" }}>
            Theme Menu {themes[themeId]}
        </PrettyHeader>
    )
}

const ChooseColor = () => {
    const { primaryColor } = useTheme()
    return (
        <div style={{ height: "10px", marginTop: "5px" }}>
            <div style={{ ...COLOR_LINE_STYLE, backgroundColor: primaryColor }}></div>
        </div>
    )
}

const ChooseHeader = () => {
    return (
        <PrettyHeader style={HEADER_STYLE} Component="h2">
            Heading
        </PrettyHeader>
    )
}

const SAMPLE_PARAGRAPH = `Click on the icons below to
customize the theme! You can set the primary color, header font, body font, and page theme!`

const ChooseParagraph = () => {
    const { bodyFont } = useTheme()

    return (
        <p style={{ ...PARAGRAPH_STYLE, fontFamily: bodyFont, margin: "0px" }}>
            {SAMPLE_PARAGRAPH}
        </p>
    )
}

const CloseThemeMenu = () => {
    const { changeMenuState } = useMenuState()
    return (
        <div style={{ margin: "15px", textAlign: "center" }}>
            <OnClickText onClick={() => changeMenuState("none")}>[close]</OnClickText>
        </div>
    )
}

const MenuContainer = ({ children }) => {
    const { primaryColor } = useTheme()

    return (
        <DivBg1
            style={{
                border: `1px dotted ${primaryColor}`,
                marginBottom: "30px",
            }}
            className={styles.themeMenu}
            tabIndex="-1"
        >
            {children}
        </DivBg1>
    )
}

const Menu = ({ style } = {}) => {
    return (
        <section className={styles.menu} style={{ ...style }}>
            <MenuContainer>
                <ChooseTheme />
                <ChooseColor />
                <ChooseHeader />
                <ChooseParagraph />
                <ChooseThemeIcons />
                <CloseThemeMenu />
            </MenuContainer>
        </section>
    )
}

export default Menu
