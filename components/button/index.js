import styles from "./Styles.module.css"
import Link from "next/link"
import { useContext, useLayoutEffect, useEffect, useState } from "react"
import { ThemeContext } from "providers"

// ***************
// IMPORTANT: Use isomorphic effect
// ***************
// React currently throws a warning when using useLayoutEffect on the server.
// To get around it, we can conditionally useEffect on the server (no-op) and
// useLayoutEffect in the browser. We need useLayoutEffect because we want
// `connect` to perform sync updates to a ref to save the latest props after
// a render is actually committed to the DOM.

const useButtonClasses = (className, isIcon, isInvertedColor) => {
    const { buttonClassNames, invertedButtonClassName } = useContext(ThemeContext)
    const [buttonClasses, setButtonClasses] = useState(buttonClassNames)
    const useIsomorphicLayoutEffect =
        typeof window !== "undefined" ? useLayoutEffect : useEffect

    const moreClassNames = isInvertedColor ? [invertedButtonClassName] : buttonClassNames
    useIsomorphicLayoutEffect(() => {
        let final = [
            ...moreClassNames,
            styles.button,
            isIcon ? styles.buttonIcon : "",
            className,
        ].join(" ")

        setButtonClasses(final)
    }, [className, isIcon, buttonClassNames])

    return buttonClasses
}

const LinkButton = ({ children, page, className, ...otherprops }) => (
    <>
        <Link href={page}>
            <a style={{ textDecoration: "none" }}>
                <button className={useButtonClasses(className)} {...otherprops}>
                    {children}
                </button>
            </a>
        </Link>
    </>
)

const LinkAwayIconButton = ({ children, page, className, ...otherprops }) => (
    <a href={page} target="_blank" rel="noopener noreferrer">
        <button className={useButtonClasses(className, true)} {...otherprops}>
            {children}
        </button>
    </a>
)

const IconButton = ({ children, className, isInvertedColor, ...otherprops }) => (
    <button
        className={useButtonClasses(className, true, isInvertedColor)}
        {...otherprops}
    >
        {children}
    </button>
)

export { LinkButton, LinkAwayIconButton, IconButton }
