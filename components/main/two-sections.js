import styles from "./Styles.module.css"
import { DivBg2 } from "../pretty-defaults"

const TwoSections = ({ div1, div2 }) => (
    <div className={styles.twoSectionsLayout}>
        <DivBg2 Component="section" className={styles.div1}>
            {div1}
        </DivBg2>
        {div2 && (
            <DivBg2 Component="section" className={styles.div2}>
                {div2}
            </DivBg2>
        )}
    </div>
)

export default TwoSections
