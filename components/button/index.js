import styles from "./Styles.module.css"
import Link from "next/link"

const LinkButton = ({ text, page, style = {}, classNames = [] } = {}) => {
    return (
        <>
            <Link href={page}>
                <a>
                    <button
                        className={[styles.button, styles.redOnHover, ...classNames].join(
                            " "
                        )}
                        {...{ style }}
                    >
                        {text}
                    </button>
                </a>
            </Link>
        </>
    )
}

const LinkIconButton = props => {
    const { children, page, ...otherprops } = props
    return (
        <Link href={page}>
            <a>
                <button
                    className={[styles.button, styles.buttonIcon].join(" ")}
                    {...otherprops}
                >
                    {children}
                </button>
            </a>
        </Link>
    )
}

const IconButton = props => {
    const { children, ...otherprops } = props
    return (
        <button className={styles.buttonIcon} {...otherprops}>
            {children}
        </button>
    )
}

export { LinkButton, LinkIconButton, IconButton }
