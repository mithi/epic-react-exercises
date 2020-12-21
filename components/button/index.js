import styles from "./Styles.module.css"
import Link from "next/link"
import { useContext, useLayoutEffect, useState } from "react"
import { ThemeContext } from "../../providers/theme/"

const useButtonClasses = (className, isIcon) => {
    const { buttonClassNames } = useContext(ThemeContext)
    const [buttonClasses, setButtonClasses] = useState(buttonClassNames)

    useLayoutEffect(() => {
        let final = [
            ...buttonClassNames,
            styles.button,
            isIcon ? styles.buttonIcon : "",
            ,
            className,
        ].join(" ")

        setButtonClasses(final)
    }, [className, isIcon, buttonClassNames])

    return buttonClasses
}

const LinkButton = ({ children, page, className, ...otherprops }) => (
    <>
        <Link href={page}>
            <a>
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

const IconButton = ({ children, className, ...otherprops }) => (
    <button className={useButtonClasses(className, true)} {...otherprops}>
        {children}
    </button>
)

export { LinkButton, LinkAwayIconButton, IconButton }
