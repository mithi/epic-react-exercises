import styles from "./Styles.module.css"
import { useTheme, useMenuState } from "hooks"
import { useCodeTheme } from "providers/code-theme"
import { SquareButton } from "../button"
import { OnClickText, PrettyHeader, DivBg1, DivBg2 } from "../pretty-defaults"
import { FaCloudSun, FaCode, FaPaintBrush, CgFormatColor, BiText } from "../icons"
import CodeBlock from "../markdown-render/dynamic-code-block"

const HOVER_STYLE = { padding: "5px", margin: "5px", borderRadius: "10px" }

const ChooseThemeIcons = () => {
    const { nextColor, nextHeaderFont, nextBodyFont, nextPageTheme } = useTheme()
    const { nextCodeTheme } = useCodeTheme()
    const iconProps = {
        side: "large",
        style: { margin: "3px" },
    }
    return (
        <DivBg2
            style={{
                ...HOVER_STYLE,
                display: "flex",
                justifyContent: "center",
            }}
        >
            <SquareButton
                onClick={nextPageTheme}
                aria-label="change page theme"
                {...iconProps}
            >
                <FaCloudSun />
            </SquareButton>
            <SquareButton
                onClick={nextColor}
                aria-label="change main color"
                {...iconProps}
            >
                <FaPaintBrush />
            </SquareButton>
            <SquareButton
                onClick={nextHeaderFont}
                aria-label="change header font"
                {...iconProps}
            >
                <CgFormatColor />
            </SquareButton>
            <SquareButton
                onClick={nextBodyFont}
                aria-label="change body font"
                {...iconProps}
            >
                <BiText />
            </SquareButton>
            <SquareButton
                onClick={nextCodeTheme}
                aria-label="change code theme"
                {...iconProps}
            >
                <FaCode />
            </SquareButton>
        </DivBg2>
    )
}

const ChooseTheme = () => {
    const themes = ["(dark) 🌙", "(light) 🔆", "(funky) 🏖️"]
    const { themeId, nextPageTheme, onHoverClassName } = useTheme()

    return (
        <PrettyHeader
            Component="h1"
            onClick={nextPageTheme}
            className={onHoverClassName}
            style={{
                fontSize: "15px",
                ...HOVER_STYLE,
            }}
        >
            Theme Menu {themes[themeId]}
        </PrettyHeader>
    )
}

const ChooseColor = () => {
    const { nextColor, primaryColor, onHoverClassName } = useTheme()
    return (
        <div onClick={nextColor} className={onHoverClassName} style={{ height: "10px" }}>
            <div
                style={{ width: "100%", height: "5px", backgroundColor: primaryColor }}
            ></div>
        </div>
    )
}

const ChooseHeader = () => {
    const { nextHeaderFont, onHoverClassName } = useTheme()
    return (
        <PrettyHeader
            onClick={nextHeaderFont}
            className={onHoverClassName}
            style={HOVER_STYLE}
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
    const { nextBodyFont, onHoverClassName } = useTheme()

    return (
        <p
            onClick={nextBodyFont}
            className={onHoverClassName}
            style={{ ...HOVER_STYLE, lineHeight: "1.3" }}
        >
            {SAMPLE_PARAGRAPH}
        </p>
    )
}

const SAMPLE_CODE = `function Hello({ world }) {
    return <div>{world}</div>
}`

const ChooseCode = () => {
    const { onHoverClassName } = useTheme()
    const { nextCodeTheme } = useCodeTheme()

    return (
        <div style={HOVER_STYLE} onClick={nextCodeTheme} className={onHoverClassName}>
            <CodeBlock language="jsx">{SAMPLE_CODE}</CodeBlock>
        </div>
    )
}

const CloseThemeMenu = () => {
    const { changeMenuState } = useMenuState()
    return (
        <div style={{ textAlign: "center", padding: "10px" }}>
            <OnClickText onClick={() => changeMenuState("none")}>[close]</OnClickText>
        </div>
    )
}

const MenuContainer = ({ children }) => {
    return <DivBg1 className={styles.themeMenu}>{children}</DivBg1>
}

const Menu = ({ style } = {}) => {
    return (
        <section className={styles.menu} style={{ ...style }} tabIndex="0">
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
