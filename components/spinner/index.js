import { useTheme } from "providers"
import styles from "./Styles.module.css"

const SpinnerDots = () => {
    const { primaryColor } = useTheme()
    const style = { backgroundColor: primaryColor }
    return (
        <div className={styles.ldsEllipsis}>
            <div {...{ style }}></div>
            <div {...{ style }}></div>
            <div {...{ style }}></div>
            <div {...{ style }}></div>
        </div>
    )
}

export { SpinnerDots }
