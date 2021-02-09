import styles from "./Theme.module.css"

const THEMES = [
    {
        body: styles.darkBody,
        section: styles.darkSection,
        button: styles.darkButton,
        buttonOnHover: styles.darkButtonOnHover,
        invertedButton: styles.invertedDarkButton,
    },
    {
        body: styles.lightBody,
        section: styles.lightSection,
        button: styles.lightButton,
        buttonOnHover: styles.lightButtonOnHover,
        invertedButton: styles.invertedLightButton,
    },
    {
        body: styles.funkyBody,
        section: styles.funkySection,
        button: styles.funkyButton,
        buttonOnHover: styles.funkyButtonOnHover,
        invertedButton: styles.invertedFunkyButton,
    },
]

export default THEMES
