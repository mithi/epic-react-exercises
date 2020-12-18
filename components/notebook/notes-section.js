import styles from "./Styles.module.css"
import { ThemeContext } from "../../providers/theme"
import { useContext } from "react"

const NotesSection = ({ div1, div2, div3 }) => {
    const { sectionClassNames } = useContext(ThemeContext)
    const div1Styles = [styles.div1, ...sectionClassNames].join(" ")
    const div2Styles = [styles.div2, ...sectionClassNames].join(" ")
    const div3Styles = [styles.div3, ...sectionClassNames].join(" ")

    return (
        <>
            <section className={div1Styles}>{div1}</section>
            <section className={div2Styles}>{div2}</section>
            <section className={div3Styles}>{div3}</section>
        </>
    )
}

export default NotesSection
