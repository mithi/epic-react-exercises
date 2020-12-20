import styles from "./Styles.module.css"
import Link from "next/link"
import { useContext } from "react"
import { ThemeContext } from "../../providers/theme/"

const LinkButton = ({ children, page, classNames = [], ...otherProps } = {}) => {
    const { buttonClassNames } = useContext(ThemeContext)
    const classNameString = [styles.button, ...buttonClassNames, ...classNames].join(" ")
    return (
        <>
            <Link href={page}>
                <a>
                    <button className={classNameString} {...otherProps}>
                        {children}
                    </button>
                </a>
            </Link>
        </>
    )
}

const LinkAwayIconButton = props => {
    const { children, page, className, ...otherprops } = props
    const { buttonClassNames } = useContext(ThemeContext)
    const classNameString = [
        ...buttonClassNames,
        styles.button,
        styles.buttonIcon,
        className,
    ].join(" ")

    return (
        <a href={page} target="_blank" rel="noopener noreferrer">
            <button className={classNameString} {...otherprops}>
                {children}
            </button>
        </a>
    )
}

const IconButton = props => {
    const { children, className, ...otherprops } = props
    const { buttonClassNames } = useContext(ThemeContext)
    const classNameString = [
        ...buttonClassNames,
        styles.button,
        styles.buttonIcon,
        className,
    ].join(" ")

    return (
        <button className={classNameString} {...otherprops}>
            {children}
        </button>
    )
}

export { LinkButton, LinkAwayIconButton, IconButton }
