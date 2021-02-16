import Link from "next/link"
import { useTheme } from "hooks"
import { useButtonThemeClasses, ButtonThemeProvider } from "providers/theme"

const DEFAULT_STYLE = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
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
        ...DEFAULT_STYLE,
        ...border,
        fontFamily: headerFont,
        backgroundColor: useBgPrimaryColor ? primaryColor : null,
        ...style,
    }
}

const getComponent = (onClick, href, type) => {
    if (onClick) {
        return OnClickButton
    } else if (href && href[0] === "/") {
        return LinkButton
    } else if (href && href.slice(0, 4) === "http") {
        return LinkOutButton
    } else if (type === "submit") {
        return OnClickButton
    }
    throw new Error(
        "Button must have a type, href or onClick prop, href must either start with a slash or http, type must be submit"
    )
}

const LinkButton = ({ href, ...otherProps }) => (
    <Link {...{ href }}>
        <a style={{ textDecoration: "none" }}>
            <button {...otherProps} tabIndex="-1" />
        </a>
    </Link>
)

const LinkOutButton = ({ href, ...otherProps }) => (
    <a {...{ href }} target="_blank" rel="noopener noreferrer">
        <button {...otherProps} tabIndex="-1" />
    </a>
)

const OnClickButton = props => <button {...props} />

const ButtonInner = ({
    disabled,
    className,
    style,
    onClick,
    type,
    href,
    useBgPrimaryColor,
    isInvertedColor,
    noDisabledBorder,
    ...otherProps
}) => {
    const Component = getComponent(onClick, href, type)
    className = useButtonThemeClasses(className, disabled, isInvertedColor)
    style = useDefaultButtonStyle(style, disabled, useBgPrimaryColor, noDisabledBorder)
    return <Component {...{ className, style, onClick, href, ...otherProps }} />
}

const ColoredButton = props => (
    <ButtonThemeProvider>
        <ButtonInner
            useBgPrimaryColor={true}
            isInvertedColor={true}
            noDisabledBorder={true}
            {...props}
        />
    </ButtonThemeProvider>
)

const PlainButton = props => (
    <ButtonThemeProvider>
        <ButtonInner
            useBgPrimaryColor={false}
            isInvertedColor={false}
            noDisabledBorder={false}
            {...props}
        />
    </ButtonThemeProvider>
)

// size: "small", "big", "40px"
const SMALL_SIDE = "32px"
const LARGE_SIDE = "50px"
const SQUARE_BUTTON_STYLE = {
    borderRadius: "25%",
    padding: "2px",
}

const SquareButton = ({ side, style, ...otherProps }) => {
    if (!side || side === "small") {
        style = {
            ...SQUARE_BUTTON_STYLE,
            height: SMALL_SIDE,
            width: SMALL_SIDE,
            margin: "2px",
            fontSize: "18px",
            ...style,
        }
    } else if (side === "large") {
        style = {
            ...SQUARE_BUTTON_STYLE,
            height: LARGE_SIDE,
            width: LARGE_SIDE,
            margin: "10px",
            fontSize: "20px",
            ...style,
        }
    } else if (side.slice(-2) === "px") {
        style = {
            ...SQUARE_BUTTON_STYLE,
            height: side,
            width: side,
            margin: "3px",
            ...style,
        }
    } else {
        throw new Error(
            `Square button must have a side equal to a falsy, "small", "large", or a number followed by "px" indicating length in pixels`
        )
        // small
    }

    return <PlainButton {...{ style, ...otherProps }} />
}

export { SquareButton, ColoredButton, PlainButton }
