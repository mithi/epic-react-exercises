import { ThemeContext } from "providers"
import { useContext } from "react"

const PrettyHeader = ({ style, children, Component, ...otherProps }) => {
    const { headerFont } = useContext(ThemeContext)
    let newStyle = { ...style, fontFamily: headerFont }
    return <Component {...{ style: newStyle, ...otherProps }}>{children}</Component>
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

export { PrettyHeader, PrettyAnchor, PrettyInputField }
