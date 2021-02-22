import styles from "./Styles.module.css"
import { SquareButton } from "components/button"
import { BiRefresh, FaPlusCircle } from "components/icons"
import { useTheme } from "providers"
import { DivBg1 } from "components/pretty-defaults"
import { useAnimatedCounter, AnimatedCountButton } from "./use-animated-counter"

const size = 70
const strokeWidth = 10
const center = size / 2
const radius = size / 2 - strokeWidth / 2
const circumference = 2 * Math.PI * radius

const Example = () => {
    const { primaryColor } = useTheme()
    const {
        state,
        countButtonProps,
        resetButtonProps,
        animatedButtonProps,
    } = useAnimatedCounter({
        minCount: 0,
        initialCount: 65,
        maxCount: 100,
        step: 5,
    })

    const { atEndPosition, progressFraction } = state
    const offset = progressFraction * circumference

    return (
        <DivBg1
            style={{
                width: "100px",
                margin: "5px",
                padding: "20px 15px",
                height: "150px",
            }}
        >
            <AnimatedCountButton {...animatedButtonProps}>
                <svg className="svg" width={size} height={size}>
                    <circle
                        className={styles.svgCircleBg}
                        stroke={primaryColor}
                        cx={center}
                        cy={center}
                        r={atEndPosition ? 1 : radius}
                        strokeWidth={atEndPosition ? size - strokeWidth : strokeWidth}
                    />
                    <circle
                        className={styles.svgCircle}
                        stroke={"gray"}
                        cx={center}
                        cy={center}
                        r={radius}
                        strokeWidth={strokeWidth}
                        strokeDasharray={circumference}
                        strokeDashoffset={offset}
                    />
                    <text
                        className={styles.svgCircleText}
                        x={center}
                        y={center}
                        stroke={primaryColor}
                    >
                        {(progressFraction * 100).toString().slice(0, 2)}%
                    </text>
                </svg>
            </AnimatedCountButton>
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    margin: "5px",
                }}
            >
                <SquareButton {...resetButtonProps}>
                    <BiRefresh />
                </SquareButton>

                <SquareButton {...countButtonProps}>
                    <FaPlusCircle />
                </SquareButton>
            </div>
        </DivBg1>
    )
}

export default Example
