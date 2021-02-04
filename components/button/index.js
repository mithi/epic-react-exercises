import Link from "next/link"
import { useLayoutEffect, useEffect, useState } from "react"
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

// ***************
// IMPORTANT: Use isomorphic effect
// ***************
// React currently throws a warning when using useLayoutEffect on the server.
// To get around it, we can conditionally useEffect on the server (no-op) and
// useLayoutEffect in the browser. We need useLayoutEffect because we want
// `connect` to perform sync updates to a ref to save the latest props after
// a render is actually committed to the DOM.

const useButtonClasses = (className, disabled, isInvertedColor) => {
    const { buttonClassNames, invertedButtonClassName, disabledClassName } = useTheme()
    const [buttonClasses, setButtonClasses] = useState(buttonClassNames)
    const useIsomorphicLayoutEffect =
        typeof window !== "undefined" ? useLayoutEffect : useEffect

    const [
        themeButtonClass,
        onHoverClass,
        colorClass,
        themeButtonClassOnHover,
    ] = buttonClassNames
    let moreClassNames = isInvertedColor
        ? [invertedButtonClassName]
        : [themeButtonClass, colorClass]

    moreClassNames = disabled
        ? moreClassNames
        : [...moreClassNames, onHoverClass, themeButtonClassOnHover]

    useIsomorphicLayoutEffect(() => {
        let final = [
            ...moreClassNames,
            className,
            disabled ? disabledClassName : "",
        ].join(" ")

        setButtonClasses(final)
    }, [className, disabled, isInvertedColor, buttonClassNames])

    return buttonClasses
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

// children, href, onclick, disabled, classname, style, otherprops

const LinkButton = ({ children, href, disabled, className, style, ...otherProps }) => {
    className = useButtonClasses(className, disabled)
    style = useDefaultButtonStyle(disabled, style)
    return (
        <Link {...{ href }}>
            <a style={{ textDecoration: "none" }}>
                <button tabIndex="-1" {...{ disabled, className, style, ...otherProps }}>
                    {children}
                </button>
            </a>
        </Link>
    )
}

const LinkAwayIconButton = ({ children, href, className, style, ...otherProps }) => {
    className = useButtonClasses(className)
    style = useDefaultButtonStyle(false, { ...ICON_STYLE, ...style })
    return (
        <a {...{ href }} tabIndex="-1" target="_blank" rel="noopener noreferrer">
            <button {...{ className, style, ...otherProps }}>{children}</button>
        </a>
    )
}

const IconButton = ({ children, className, style, ...otherProps }) => {
    className = useButtonClasses(className)
    style = useDefaultButtonStyle(false, { ...ICON_STYLE, style })
    return <button {...{ className, style, ...otherProps }}>{children}</button>
}

const TextButton = ({
    children,
    onClick,
    disabled,
    className,
    style,
    useBgPrimaryColor,
    isInvertedColor,
    ...otherProps
}) => {
    className = useButtonClasses(className, disabled, isInvertedColor)
    const { bodyFont, primaryColor } = useTheme()
    style = { fontFamily: bodyFont, ...style }
    style = useBgPrimaryColor ? { ...style, backgroundColor: primaryColor } : style
    return (
        <button {...{ onClick, disabled, className, style, ...otherProps }}>
            {children}
        </button>
    )
}

const DefaultButton = ({ children, disabled, style, ...otherProps }) => {
    style = useDefaultButtonStyle(disabled, style)
    return <TextButton {...{ disabled, style, ...otherProps }}>{children}</TextButton>
}

export { LinkAwayIconButton, IconButton, TextButton, DefaultButton, LinkButton }
