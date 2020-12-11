import styles from "./Styles.module.css"
import Link from "next/link"

const LinkButton = ({ text, page, style = {} } = {}) => {
    return (
        <>
            <Link href={page}>
                <a>
                    <button className={styles.button} {...{ style }}>
                        {text}
                    </button>
                </a>
            </Link>
        </>
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

export { LinkButton, IconButton }
