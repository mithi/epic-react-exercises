import styles from "./Styles.module.css"
import { useTheme } from "providers/hooks"

const TwoSections = ({ div1, div2 }) => {
    const { sectionBg } = useTheme()

    const div1Styles = [styles.div1, sectionBg].join(" ")
    const div2Styles = [styles.div2, sectionBg].join(" ")

    return (
        <div className={styles.twoSectionsLayout}>
            <section className={div1Styles}>{div1}</section>
            {div2 ? <section className={div2Styles}>{div2}</section> : null}
        </div>
    )
}

export default TwoSections
