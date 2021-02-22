import { SquareButton } from "components/button"
import { BiRefresh, FaPlusCircle } from "components/icons"
import { OnClickText, DivBg1 } from "components/pretty-defaults"
import { useAnimatedCounter, AnimatedCountButton } from "./use-animated-counter"

const Example = () => {
    const {
        state,
        countProps,
        countButtonProps,
        resetButtonProps,
        animatedButtonProps,
    } = useAnimatedCounter({
        minCount: 1,
        maxCount: 10,
        step: 2,
    })

    const {
        count,
        atEndPosition,
        animationType,
        atStartPosition,
        eventCount,
        progressFraction,
        minCount,
        maxCount,
        initialCount,
        step,
    } = state

    return (
        <DivBg1
            style={{
                display: "flex",
                margin: "5px",
                flexDirection: "row",
                width: "300px",
            }}
        >
            <div style={{ textAlign: "center", width: "140px" }}>
                <AnimatedCountButton {...animatedButtonProps}>
                    <span {...countProps} style={{ fontSize: "130px" }} />
                </AnimatedCountButton>
                <div
                    style={{
                        display: "flex",
                        marginTop: "-20px",
                        justifyContent: "center",
                    }}
                >
                    <SquareButton {...resetButtonProps}>
                        <BiRefresh />
                    </SquareButton>

                    <SquareButton {...countButtonProps}>
                        <FaPlusCircle />
                    </SquareButton>
                </div>
            </div>

            <div style={{ fontSize: "10px", lineHeight: 1.0, marginLeft: "5px" }}>
                <li>min: {minCount}</li>
                <li>max: {maxCount}</li>
                <li>step: {step}</li>
                <li>initial: {initialCount}</li>
                <li>current: {count}</li>
                <li>
                    position:
                    {atEndPosition ? "end" : atStartPosition ? "start" : "between"}
                </li>
                <li>motion: {animationType}</li>
                <li>event: {eventCount}</li>
                <li>progress: {progressFraction.toString().slice(0, 5)}</li>
                <li>
                    <OnClickText {...countButtonProps} disabled={false}>
                        Try incrementing
                    </OnClickText>
                </li>
                <li>
                    <OnClickText {...resetButtonProps} disabled={false}>
                        Try resetting
                    </OnClickText>
                </li>
            </div>
        </DivBg1>
    )
}

export default Example
