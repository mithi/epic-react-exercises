import dynamic from "next/dynamic"
import styles from "./Styles.module.css"
import { FaCloudSun, FaCode, FaPaintBrush } from "react-icons/fa"
import { CgFormatColor } from "react-icons/cg"
import { BiText } from "react-icons/bi"
import { OnClickButton } from "../button"
import { OnClickText, PrettyHeader } from "../pretty-defaults"
import { useTheme, useMenuState } from "hooks"
import { SpinnerDots } from "components/spinner"

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

const SAMPLE_CODE = "```python\n def hello():\n    return 'world!'"
const SAMPLE_PARAGRAPH = `Click on any of the sample elements
to change its style. Customize its primary color, header font, body font, code
theme, and page theme!`

const DynamicMarkdownRender = dynamic(() => import("components/markdown-render"), {
    // eslint-disable-next-line react/display-name
    loading: () => <SpinnerDots />,
})

const Menu = ({ style } = {}) => {
    const { changeMenuState } = useMenuState()
    const {
        nextColor,
        nextHeaderFont,
        nextCodeTheme,
        nextBodyFont,
        nextPageTheme,
        primaryColor,
        bodyFont,
        onHoverClassName,
        bodyClassNames,
        sectionClassNames,
    } = useTheme()

    return (
        <section className={styles.menu} style={{ ...style }}>
            <div
                style={{
                    border: `1px dotted ${primaryColor}`,
                    marginBottom: "30px",
                }}
                className={[bodyClassNames[0], styles.themeMenu].join(" ")}
                aria-label={"change main color"}
            >
                {/** for accessibility **/}
                <PrettyHeader Component="h1" style={{ fontSize: "15px", margin: "10px" }}>
                    Theme Menu
                </PrettyHeader>

                <div
                    onClick={nextColor}
                    className={onHoverClassName}
                    style={{ height: "10px", marginTop: "5px" }}
                >
                    <div
                        style={{ ...COLOR_LINE_STYLE, backgroundColor: primaryColor }}
                    ></div>
                </div>

                <PrettyHeader
                    onClick={nextHeaderFont}
                    className={onHoverClassName}
                    style={HEADER_STYLE}
                    Component="h2"
                >
                    Heading
                </PrettyHeader>

                <p
                    onClick={nextBodyFont}
                    className={onHoverClassName}
                    style={{ ...PARAGRAPH_STYLE, fontFamily: bodyFont, margin: "0px" }}
                >
                    {SAMPLE_PARAGRAPH}
                </p>

                <div
                    style={{ padding: "5px", borderRadius: "5px", marginBottom: "10px" }}
                    onClick={nextCodeTheme}
                >
                    <DynamicMarkdownRender>{SAMPLE_CODE}</DynamicMarkdownRender>
                </div>

                <div className={sectionClassNames[0]} style={ICONS_CONTAINER_STYLE}>
                    <OnClickButton
                        onClick={nextPageTheme}
                        style={ICON_BUTTON_STYLE}
                        aria-label={"change page theme"}
                    >
                        <FaCloudSun />
                    </OnClickButton>

                    <OnClickButton
                        onClick={nextColor}
                        style={ICON_BUTTON_STYLE}
                        aria-label={"change main color"}
                    >
                        <FaPaintBrush />
                    </OnClickButton>
                    <OnClickButton
                        onClick={nextHeaderFont}
                        style={ICON_BUTTON_STYLE}
                        aria-label={"change header font"}
                    >
                        <CgFormatColor />
                    </OnClickButton>
                    <OnClickButton
                        onClick={nextBodyFont}
                        style={ICON_BUTTON_STYLE}
                        aria-label={"change body font"}
                    >
                        <BiText />
                    </OnClickButton>
                    <OnClickButton
                        onClick={nextCodeTheme}
                        style={ICON_BUTTON_STYLE}
                        aria-label={"change code theme"}
                    >
                        <FaCode />
                    </OnClickButton>
                </div>
                <div style={{ margin: "15px", textAlign: "center" }}>
                    <OnClickText onClick={() => changeMenuState("none")}>
                        [close]
                    </OnClickText>
                </div>
            </div>
        </section>
    )
}

export default Menu
