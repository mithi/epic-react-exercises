import styles from "./Styles.module.css"
import Link from "next/link"
import { useContext } from "react"
import { ThemeContext } from "../../providers/theme/"

const TextButton = ({ children, classNames = [], ...otherprops } = {}) => {
    const { buttonClassNames } = useContext(ThemeContext)
    const className = [styles.button, ...buttonClassNames, ...classNames].join(" ")
    return <button {...{ className, ...otherprops }}>{children}</button>
}

const LinkButton = ({ children, page, style = {}, classNames = [] } = {}) => {
    const { buttonClassNames } = useContext(ThemeContext)
    const className = [styles.button, ...buttonClassNames, ...classNames].join(" ")
    return (
        <>
            <Link href={page}>
                <a>
                    <button {...{ className, style }}>{children}</button>
                </a>
            </Link>
        </>
    )
}

const LinkIconButton = props => {
    const { children, page, ...otherprops } = props
    const { buttonClassNames } = useContext(ThemeContext)
    const className = [...buttonClassNames, styles.button, styles.buttonIcon].join(" ")

    return (
        <Link href={page}>
            <a>
                <button {...{ className, ...otherprops }}>{children}</button>
            </a>
        </Link>
    )
}

const LinkAwayIconButton = props => {
    const { children, page, ...otherprops } = props
    const { buttonClassNames } = useContext(ThemeContext)
    const className = [...buttonClassNames, styles.button, styles.buttonIcon].join(" ")

    return (
        <a href={page} target="_blank" rel="noopener noreferrer">
            <button className={className} {...otherprops}>
                {children}
            </button>
        </a>
    )
}

const IconButton = props => {
    const { children, ...otherprops } = props
    const { buttonClassNames } = useContext(ThemeContext)
    const className = [...buttonClassNames, styles.button, styles.buttonIcon].join(" ")

    return (
        <button className={className} {...otherprops}>
            {children}
        </button>
    )
}

export { LinkButton, LinkAwayIconButton, LinkIconButton, IconButton, TextButton }
