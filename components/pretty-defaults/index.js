import { ThemeContext } from "providers"
import { useContext } from "react"

const PrettyHeader = ({ style, children, Component, ...otherProps }) => {
    Component = Component ? Component : "div"
    const { headerFont } = useContext(ThemeContext)
    style = { ...style, fontFamily: headerFont }
    return <Component {...{ style, ...otherProps }}>{children}</Component>
}

const PrettyAnchor = ({ style, children, onClick, href, ...otherProps }) => {
    const { primaryColor } = useContext(ThemeContext)
    return (
        <a
            style={{ color: primaryColor, ...style }}
            {...{ onClick, href, ...otherProps }}
        >
            {children}
        </a>
    )
}

const INPUT_STYLE = {
    borderWidth: "0px",
    borderRadius: "10px",
    margin: "5px",
    padding: "5px 15px",
}

const PrettyInputField = ({ placeholder, value, onChange, style, ...otherProps }) => {
    const { bodyClassNames, bodyFont } = useContext(ThemeContext)
    return (
        <input
            className={bodyClassNames[0]}
            style={{ ...INPUT_STYLE, ...style, fontFamily: bodyFont }}
            {...{ placeholder, value, onChange, ...otherProps }}
        />
    )
}

const BorderedDiv = ({ style, children }) => {
    const { primaryColor } = useContext(ThemeContext)
    return <div style={{ border: `1px solid ${primaryColor}`, ...style }}>{children}</div>
}
export { PrettyHeader, PrettyAnchor, PrettyInputField, BorderedDiv }
