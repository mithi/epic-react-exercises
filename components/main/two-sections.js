import styles from "./Styles.module.css"
import { useContext } from "react"
import { ThemeContext } from "providers"

const TwoSections = ({ div1, div2 }) => {
    const { sectionClassNames } = useContext(ThemeContext)

    const div1Styles = [styles.div1, ...sectionClassNames].join(" ")
    const div2Styles = [styles.div2, ...sectionClassNames].join(" ")

    return (
        <div className={styles.twoSectionsLayout}>
            <section className={div1Styles}>{div1}</section>
            <section className={div2Styles}>{div2}</section>
        </div>
    )
}

export default TwoSections
