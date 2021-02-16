import Link from "next/link"
import { useTheme } from "hooks"
import { useButtonThemeClasses, ButtonThemeProvider } from "providers/theme"

const TOTALLY_CENTERED = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
}

const AUTO_SIZE_STYLE = {
    ...TOTALLY_CENTERED,
    flexShrink: 0,
    textDecoration: "none",
    borderStyle: "none",
    borderRadius: "8px",
    height: "auto",
    width: "auto",
    margin: "5px",
    padding: "10px",
    fontSize: "12px",
}

const useDefaultButtonStyle = (style, disabled, useBgPrimaryColor, noDisabledBorder) => {
    const { headerFont, primaryColor } = useTheme()
    const disabledBorder = {
        borderWidth: "2px",
        borderStyle: "solid",
        borderColor: primaryColor,
    }
    const border = disabled && !noDisabledBorder ? disabledBorder : null

    return {
        ...AUTO_SIZE_STYLE,
        ...border,
        fontFamily: headerFont,
        backgroundColor: useBgPrimaryColor ? primaryColor : null,
        ...style,
    }
}

const LinkButtonInner = ({
    children,
    href,
    disabled,
    className,
    style,
    ...otherProps
}) => {
    className = useButtonThemeClasses(className, disabled)
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

const LinkOutButtonInner = ({ children, href, className, style, ...otherProps }) => {
    className = useButtonThemeClasses(className)
    style = useDefaultButtonStyle(style, false)
    return (
        <a {...{ href }} target="_blank" rel="noopener noreferrer">
            <button {...{ className, style, ...otherProps }} tabIndex="-1">
                {children}
            </button>
        </a>
    )
}

const OnClickButtonInner = ({
    children,
    onClick,
    disabled,
    className,
    style,
    useBgPrimaryColor,
    isInvertedColor,
    noDisabledBorder,
    ...otherProps
}) => {
    className = useButtonThemeClasses(className, disabled, isInvertedColor)
    style = useDefaultButtonStyle(style, disabled, useBgPrimaryColor, noDisabledBorder)
    return (
        <button {...{ onClick, disabled, className, style, ...otherProps }}>
            {children}
        </button>
    )
}

const DefaultButton = ({ onClick, children, style, disabled, ...otherProps }) => (
    <ButtonThemeProvider>
        <OnClickButton
            useBgPrimaryColor={true}
            isInvertedColor={true}
            noDisabledBorder={true}
            {...{ onClick, style, disabled, ...otherProps }}
        >
            {children}
        </OnClickButton>
    </ButtonThemeProvider>
)

const LinkButton = props => (
    <ButtonThemeProvider>
        <LinkButtonInner {...props} />
    </ButtonThemeProvider>
)

const LinkOutButton = props => (
    <ButtonThemeProvider>
        <LinkOutButtonInner {...props} />
    </ButtonThemeProvider>
)

const OnClickButton = props => (
    <ButtonThemeProvider>
        <OnClickButtonInner {...props} />
    </ButtonThemeProvider>
)

// size: "small", "big", "40px"
// componentType: linkOut, onClick, link
const SMALL_SIDE = "32px"
const LARGE_SIDE = "50px"
const SQUARE_BUTTON_STYLE = {
    ...TOTALLY_CENTERED,
    borderRadius: "25%",
    padding: "2px",
}

const SquareButton = ({ side, style, ...otherProps }) => {
    const { onClick, href } = otherProps

    let Component = null
    if (onClick) {
        Component = OnClickButton
    } else if (href && href[0] === "/") {
        Component = LinkButton
    } else if (href && href.slice(0, 4) === "http") {
        Component = LinkOutButton
    } else {
        throw new Error(
            "SquareButton must have an href or onClick prop, href must either start with a slash or http"
        )
    }

    if (side === "large") {
        style = {
            ...SQUARE_BUTTON_STYLE,
            height: LARGE_SIDE,
            width: LARGE_SIDE,
            margin: "10px",
            fontSize: "20px",
            ...style,
        }
    } else if (side === "small") {
        style = {
            ...SQUARE_BUTTON_STYLE,
            height: SMALL_SIDE,
            width: SMALL_SIDE,
            margin: "3px",
            fontSize: "18px",
            ...style,
        }
    } else {
        style = {
            ...SQUARE_BUTTON_STYLE,
            height: side,
            width: side,
            margin: "3px",
            ...style,
        }
    }

    return <Component {...{ style, ...otherProps }} />
}

export { LinkOutButton, OnClickButton, LinkButton, DefaultButton, SquareButton }
