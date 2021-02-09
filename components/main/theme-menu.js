import DynamicMarkdownRender from "components/markdown-render/dynamic"
import styles from "./Styles.module.css"
import { FaCloudSun, FaCode, FaPaintBrush } from "react-icons/fa"
import { CgFormatColor } from "react-icons/cg"
import { BiText } from "react-icons/bi"
import { OnClickButton } from "../button"
import { OnClickText, PrettyHeader } from "../pretty-defaults"
import { useTheme, useMenuState } from "hooks"
import { useCodeTheme } from "providers/code-theme"

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
    const {
        nextColor,
        nextHeaderFont,
        nextBodyFont,
        nextPageTheme,
        sectionClassNames,
    } = useTheme()
    const { nextCodeTheme } = useCodeTheme()

    return (
        <div className={sectionClassNames[0]} style={ICONS_CONTAINER_STYLE}>
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
            <SquareIcon onClick={nextCodeTheme} aria-label="change code theme">
                <FaCode />
            </SquareIcon>
        </div>
    )
}

const ChooseTheme = () => {
    const themes = ["(dark) 🌙", "(light) 🔆", "(funky) 🏖️"]
    const { themeId, nextPageTheme } = useTheme()

    return (
        <PrettyHeader
            Component="h1"
            onClick={nextPageTheme}
            style={{ fontSize: "15px", margin: "10px" }}
        >
            Theme Menu {themes[themeId]}
        </PrettyHeader>
    )
}

const ChooseColor = () => {
    const { nextColor, primaryColor, onHoverClassName } = useTheme()
    return (
        <div
            onClick={nextColor}
            className={onHoverClassName}
            style={{ height: "10px", marginTop: "5px" }}
        >
            <div style={{ ...COLOR_LINE_STYLE, backgroundColor: primaryColor }}></div>
        </div>
    )
}

const ChooseHeader = () => {
    const { nextHeaderFont, onHoverClassName } = useTheme()
    return (
        <PrettyHeader
            onClick={nextHeaderFont}
            className={onHoverClassName}
            style={HEADER_STYLE}
            Component="h2"
        >
            Heading
        </PrettyHeader>
    )
}

const SAMPLE_PARAGRAPH = `Click on any of the sample elements
to change its style. Customize its primary color, header font, body font, code
theme, and page theme!`

const ChooseParagraph = () => {
    const { nextBodyFont, bodyFont, onHoverClassName } = useTheme()

    return (
        <p
            onClick={nextBodyFont}
            className={onHoverClassName}
            style={{ ...PARAGRAPH_STYLE, fontFamily: bodyFont, margin: "0px" }}
        >
            {SAMPLE_PARAGRAPH}
        </p>
    )
}

const SAMPLE_CODE = "```python\n def hello():\n    return 'world!'"

const ChooseCode = () => {
    const { nextCodeTheme } = useCodeTheme()

    return (
        <div
            style={{ padding: "5px", borderRadius: "5px", marginBottom: "10px" }}
            onClick={nextCodeTheme}
        >
            <DynamicMarkdownRender>{SAMPLE_CODE}</DynamicMarkdownRender>
        </div>
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
    const { primaryColor, bodyClassNames } = useTheme()

    return (
        <div
            style={{
                border: `1px dotted ${primaryColor}`,
                marginBottom: "30px",
            }}
            className={[bodyClassNames[0], styles.themeMenu].join(" ")}
        >
            {children}
        </div>
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
                <ChooseCode />
                <ChooseThemeIcons />
                <CloseThemeMenu />
            </MenuContainer>
        </section>
    )
}

export default Menu
