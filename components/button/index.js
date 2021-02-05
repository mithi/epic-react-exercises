import Link from "next/link"
import { useTheme } from "hooks"

const DEFAULT_BUTTON_STYLE = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: "3px",
    width: "30px",
    height: "30px",
    fontSize: "20px",
    textDecoration: "none",
    borderRadius: "25%",
    borderStyle: "none",
}

const ICON_STYLE = {
    width: "50px",
    height: "50px",
    margin: "10px",
}

const useButtonClasses = (className, disabled, isInvertedColor) => {
    const { buttonClassNames, invertedButtonClassName, disabledClassName } = useTheme()

    const [
        themeButtonClass,
        onHoverClass,
        colorClass, // the color of the element inside
        themeButtonClassOnHover,
    ] = buttonClassNames

    /* IMPORTANT: The order of classnames here might be important, need to test... */
    let final = null
    final = isInvertedColor ? [invertedButtonClassName] : [themeButtonClass, colorClass]

    if (!disabled) {
        final = [...final, onHoverClass, themeButtonClassOnHover]
    }

    final = [...final, className]

    if (disabled) {
        final = [...final, disabledClassName]
    }

    return final.join(" ")
}

const useDefaultButtonStyle = (disabled, style) => {
    const { headerFont, primaryColor } = useTheme()
    const disabledBorder = {
        borderWidth: "2px",
        borderStyle: "solid",
        borderColor: primaryColor,
    }
    const border = disabled ? disabledBorder : null

    return {
        ...DEFAULT_BUTTON_STYLE,
        ...border,
        fontFamily: headerFont,
        ...style,
    }
}

// children, href, onClick, disabled, className, style, otherProps

const LinkButton = ({ children, href, disabled, className, style, ...otherProps }) => {
    className = useButtonClasses(className, disabled)
    style = useDefaultButtonStyle(disabled, style)
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
    style = useDefaultButtonStyle(false, { ...ICON_STYLE, ...style })
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
    ...otherProps
}) => {
    const { headerFont, primaryColor } = useTheme()
    className = useButtonClasses(className, disabled, isInvertedColor)
    style = useDefaultButtonStyle(disabled, {
        ...ICON_STYLE,
        fontFamily: headerFont,
        backgroundColor: useBgPrimaryColor ? primaryColor : null,
        ...style,
    })

    return (
        <button {...{ onClick, disabled, className, style, ...otherProps }}>
            {children}
        </button>
    )
}

export { LinkOutButton, OnClickButton, LinkButton }
