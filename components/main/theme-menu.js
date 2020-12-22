import styles from "./Styles.module.css"
import MarkdownRender from "../markdown-render"
import { GlobalStateContext } from "providers/global-state"
import { ThemeContext } from "providers/theme"
import { useContext } from "react"
import { IconButton } from "../button"
import { FaCloudSun, FaCode, FaPaintBrush } from "react-icons/fa"
import { CgFormatColor } from "react-icons/cg"
import { BiText } from "react-icons/bi"

const SAMPLE_CODE = "```python\n def hello():\n    return 'world!'"
const SAMPLE_PARAGRAPH = `Click on any of the sample elements
to change its style. You can
customize: the primary color, the header font, the body font, the code
theme, and the page theme.`

const Menu = ({ style } = {}) => {
    const { changeMenuState } = useContext(GlobalStateContext)
    const {
        nextColor,
        nextHeaderFont,
        nextCodeTheme,
        headerFont,
        nextBodyFont,
        nextPageTheme,
        bodyFont,
        primaryColor,
        onHoverClassName,
        bodyClassNames,
        sectionClassNames,
    } = useContext(ThemeContext)

    return (
        <section className={styles.menu} style={{ ...style }}>
            <div
                style={{
                    border: `1px dotted ${primaryColor}`,
                }}
                className={[bodyClassNames[0], styles.themeMenu].join(" ")}
            >
                <div
                    onClick={nextColor}
                    className={onHoverClassName}
                    style={{ height: "10px", marginTop: "5px" }}
                >
                    <div
                        style={{
                            width: "100%",
                            height: "5px",
                            backgroundColor: primaryColor,
                        }}
                    ></div>
                </div>
                <h1
                    onClick={nextHeaderFont}
                    className={onHoverClassName}
                    style={{
                        fontFamily: headerFont,
                        padding: "10px",
                        borderRadius: "5px",
                        margin: "10px",
                        marginBottom: "0",
                    }}
                >
                    Header
                </h1>

                <p
                    onClick={nextBodyFont}
                    className={onHoverClassName}
                    style={{
                        fontFamily: bodyFont,
                        padding: "10px",
                        borderRadius: "5px",
                        lineHeight: "1.3",
                        margin: "10px",
                        marginTop: "0",
                    }}
                >
                    {SAMPLE_PARAGRAPH}
                </p>

                <div
                    style={{ padding: "5px", borderRadius: "5px" }}
                    className={onHoverClassName}
                    onClick={nextCodeTheme}
                >
                    <MarkdownRender>{SAMPLE_CODE}</MarkdownRender>
                </div>

                <div
                    className={sectionClassNames[0]}
                    style={{
                        margin: "5px",
                        padding: "5px",
                        borderRadius: "15px",
                        display: "flex",
                        justifyContent: "center",
                    }}
                >
                    <IconButton onClick={nextPageTheme} style={{ margin: "10px 5px" }}>
                        <FaCloudSun />
                    </IconButton>

                    <IconButton onClick={nextColor} style={{ margin: "10px 5px" }}>
                        <FaPaintBrush />
                    </IconButton>
                    <IconButton onClick={nextHeaderFont} style={{ margin: "10px 5px" }}>
                        <CgFormatColor />
                    </IconButton>
                    <IconButton onClick={nextBodyFont} style={{ margin: "10px 5px" }}>
                        <BiText />
                    </IconButton>
                    <IconButton onClick={nextCodeTheme} style={{ margin: "10px 5px" }}>
                        <FaCode />
                    </IconButton>
                </div>
                <div
                    onClick={() => changeMenuState("theme")}
                    style={{
                        color: primaryColor,
                        margin: "20px 0px",
                        textAlign: "center",
                        cursor: "pointer",
                    }}
                >
                    close this menu
                </div>
            </div>
        </section>
    )
}

export default Menu
