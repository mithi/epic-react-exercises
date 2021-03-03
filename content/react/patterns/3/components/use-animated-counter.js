import styles from "./Styles.module.css"
import { useState } from "react"
import { motion } from "framer-motion"

const useAnimatedCounter = ({
    maxCount = 10,
    minCount = 0,
    step = 1,
    initialCount,
} = {}) => {
    const [count, setCount] = useState(initialCount || minCount)
    const [eventCount, setEventCount] = useState(0)

    if (maxCount < 0 || minCount < 0 || step < 0 || initialCount < 0) {
        throw new Error(
            "maxCount, minCount, step, and initialCount must be a positive number"
        )
    }

    const onClick = () => {
        setEventCount(eventCount + 1)
        const nextCount = count + step
        if (nextCount > maxCount) {
            return
        }
        setCount(nextCount)
    }

    const animationType =
        count === minCount ? "entrance" : count + step > maxCount ? "shake" : "default"

    const atEndPosition = count + step > maxCount || count >= maxCount
    const atStartPosition = count === minCount
    const progressFraction = count / (maxCount - minCount)

    return {
        countProps: {
            "aria-valuemax": maxCount,
            "aria-valuemin": minCount,
            "aria-valuenow": count,
            "children": count,
            "title": count,
        },
        countButtonProps: {
            "aria-pressed": !atStartPosition,
            "disabled": atEndPosition,
            "title": `increment count by ${step}`,
            "aria-label": `increment count by ${step}`,
            onClick,
        },
        resetButtonProps: {
            disabled: atStartPosition,
            title: "reset count",
            onClick: () => {
                setEventCount(eventCount + 1)
                setCount(minCount)
            },
        },
        animatedButtonProps: {
            key: eventCount,
            animationType,
            onClick,
        },
        state: {
            atStartPosition,
            animationType,
            atEndPosition,
            eventCount,
            progressFraction,
            count,
            initialCount,
            minCount,
            maxCount,
            step,
        },
    }
}

const defaultVariant = {
    scale: [2, 1, 1.5, 1],
    transition: { duration: 0.75, loop: 0 },
}

const shakeVariant = {
    x: [-10, 10, -5, 5, -2.5, 2.5, 0],
    transition: { duration: 0.75, loop: 0 },
}

const fadeInVariant = {
    opacity: [0, 1],
    y: [10, -5, 0],
    transition: { duration: 1.0, loop: 0 },
}

const pressedVariant = { color: "#81ecec" }
const hoverVariant = { color: "#fd79a8" }

const AnimatedCountButton = ({ onClick, children, animationType, ...otherProps }) => (
    <div {...{ onClick, ...otherProps }} className={styles.noSelect}>
        <motion.div
            animate={
                animationType === "entrance"
                    ? fadeInVariant
                    : animationType === "shake"
                    ? shakeVariant
                    : defaultVariant
            }
            whileHover={hoverVariant}
            whileTap={pressedVariant}
        >
            {children}
        </motion.div>
    </div>
)

export { useAnimatedCounter, AnimatedCountButton }
