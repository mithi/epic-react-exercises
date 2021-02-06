import Link from "next/link"
import { useTheme } from "hooks"

const TOTALLY_CENTERED = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
}

const BIG_ICON_STYLE = {
    width: "50px",
    height: "50px",
    margin: "10px",
    fontSize: "20px",
    borderRadius: "25%",
}

const DEFAULT_BUTTON_STYLE = {
    ...TOTALLY_CENTERED,
    ...BIG_ICON_STYLE,
    textDecoration: "none",
    borderStyle: "none",
}

const AUTO_SIZE_STYLE = {
    height: "auto",
    width: "auto",
    margin: "10px",
    padding: "10px",
    fontSize: "12px",
    borderRadius: "8px",
}

const useButtonClasses = (className, disabled, isInvertedColor) => {
    const { buttonClassNames, invertedButtonClassName, disabledClassName } = useTheme()

    // invertedButtonClassName
    //      - normal, opacity: slightly less than 1.0
    //      - hovered, opacity: 1.0
    //      - backgroundColor: UNDEFINED
    //      - color: based on theme (light (white), dark (black), funky (red))
    // disabledClassName
    //     - normal: opacity: around 0.3
    //     - hovered: opacity: name as normal
    const [
        defaultBackground, // default button background color when not hovered (light (white), dark (black), funky (red))
        defaultColorOnHover, // default color of the element when hovered (light (white), dark (black), funky (red))
        defaultColor, // default color of element when not hovered (primaryColor)
        defaultBackgroundOnHover, // default background color when hovered (primary color)
    ] = buttonClassNames

    let final = isInvertedColor
        ? [invertedButtonClassName]
        : [defaultBackground, defaultColor]

    final = disabled
        ? [...final, disabledClassName]
        : [...final, defaultColorOnHover, defaultBackgroundOnHover]

    return [...final, className].join(" ")
}

const useDefaultButtonStyle = (
    style,
    disabled,
    useBgPrimaryColor,
    isAutoSize,
    noDisabledBorder
) => {
    const { headerFont, primaryColor } = useTheme()
    const disabledBorder = {
        borderWidth: "2px",
        borderStyle: "solid",
        borderColor: primaryColor,
    }
    const border = disabled && !noDisabledBorder ? disabledBorder : null
    const autoStyle = isAutoSize ? AUTO_SIZE_STYLE : null

    return {
        ...DEFAULT_BUTTON_STYLE,
        ...border,
        fontFamily: headerFont,
        backgroundColor: useBgPrimaryColor ? primaryColor : null,
        ...autoStyle,
        ...style,
    }
}

const LinkButton = ({ children, href, disabled, className, style, ...otherProps }) => {
    className = useButtonClasses(className, disabled)
    style = useDefaultButtonStyle(style, disabled)
    return (
        <Link {...{ href }}>
            <a style={{ textDecoration: "none" }}>
                <button {...{ disabled, className, style, ...otherProps }} tabIndex="-1">
                    {children}
                </button>
            </a>
        </Link>
    )
}

const LinkOutButton = ({ children, href, className, style, ...otherProps }) => {
    className = useButtonClasses(className)
    style = useDefaultButtonStyle(style, false)
    return (
        <a {...{ href }} target="_blank" rel="noopener noreferrer">
            <button {...{ className, style, ...otherProps }} tabIndex="-1">
                {children}
            </button>
        </a>
    )
}

const OnClickButton = ({
    children,
    onClick,
    disabled,
    className,
    style,
    useBgPrimaryColor,
    isInvertedColor,
    isAutoSize,
    noDisabledBorder,
    ...otherProps
}) => {
    className = useButtonClasses(className, disabled, isInvertedColor)
    style = useDefaultButtonStyle(
        style,
        disabled,
        useBgPrimaryColor,
        isAutoSize,
        noDisabledBorder
    )
    return (
        <button {...{ onClick, disabled, className, style, ...otherProps }}>
            {children}
        </button>
    )
}

const DefaultButton = ({ onClick, children, style, disabled, ...otherProps }) => (
    <OnClickButton
        isAutoSize={true}
        useBgPrimaryColor={true}
        isInvertedColor={true}
        noDisabledBorder={true}
        {...{ onClick, style, disabled, ...otherProps }}
    >
        {children}
    </OnClickButton>
)

export { LinkOutButton, OnClickButton, LinkButton, DefaultButton }
