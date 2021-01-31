import styles from "./Styles.module.css"
import Link from "next/link"
import { useLayoutEffect, useEffect, useState } from "react"
import { useTheme } from "hooks"

// ***************
// IMPORTANT: Use isomorphic effect
// ***************
// React currently throws a warning when using useLayoutEffect on the server.
// To get around it, we can conditionally useEffect on the server (no-op) and
// useLayoutEffect in the browser. We need useLayoutEffect because we want
// `connect` to perform sync updates to a ref to save the latest props after
// a render is actually committed to the DOM.

const useButtonClasses = (className, isIcon, disabled, isInvertedColor) => {
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
            styles.button,
            isIcon ? styles.buttonIcon : "",
            className,
            disabled ? disabledClassName : "",
        ].join(" ")

        setButtonClasses(final)
    }, [className, isIcon, disabled, isInvertedColor, buttonClassNames])

    return buttonClasses
}

const LinkButton = ({
    children,
    page,
    className,
    disabled,
    isIconButton,
    ...otherprops
}) => {
    const buttonClass = useButtonClasses(className, isIconButton, disabled)
    return (
        <>
            <Link href={page}>
                <a style={{ textDecoration: "none" }}>
                    <button
                        tabIndex="-1"
                        className={buttonClass}
                        {...{ ...otherprops, disabled, children }}
                    />
                </a>
            </Link>
        </>
    )
}

const LinkAwayIconButton = ({ children, page, className, ...otherProps }) => {
    const buttonClass = useButtonClasses(className, true)
    return (
        <a href={page} tabIndex="-1" target="_blank" rel="noopener noreferrer">
            <button className={buttonClass} {...otherProps}>
                {children}
            </button>
        </a>
    )
}

const IconButton = ({ children, className, ...otherprops }) => {
    const buttonClass = useButtonClasses(className, true)
    return (
        <button className={buttonClass} {...otherprops}>
            {children}
        </button>
    )
}

const TextButton = ({
    children,
    className,
    isInvertedColor,
    disabled,
    style,
    useBgPrimaryColor,
    ...otherprops
}) => {
    const buttonClass = useButtonClasses(className, true, disabled, isInvertedColor)
    const { bodyFont, primaryColor } = useTheme()
    style = { fontFamily: bodyFont, ...style }
    style = useBgPrimaryColor ? { ...style, backgroundColor: primaryColor } : style

    return (
        <button
            className={buttonClass}
            {...{ ...otherprops, style, disabled, children }}
        />
    )
}

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
}

const useDefaultButtonStyle = (disabled, style) => {
    const { headerFont, primaryColor } = useTheme()
    const border = disabled ? `2px solid ${primaryColor}` : null

    return {
        ...DEFAULT_BUTTON_STYLE,
        border,
        fontFamily: headerFont,
        ...style,
    }
}

const DefaultLinkButton = ({ style, disabled, ...otherProps }) => {
    style = useDefaultButtonStyle(disabled, style)
    return <LinkButton {...{ ...otherProps, disabled, style }} />
}

const DefaultButton = ({ style, children, disabled, ...otherProps }) => {
    style = useDefaultButtonStyle(disabled, style)
    return <TextButton {...{ ...otherProps, disabled, style, children }} />
}

export {
    LinkButton,
    LinkAwayIconButton,
    IconButton,
    TextButton,
    DefaultButton,
    DefaultLinkButton,
}
