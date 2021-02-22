import { FaStar, ImCross, FaRegStar } from "components/icons"
import { DivBg1 } from "components/pretty-defaults"
import { useAnimatedCounter, AnimatedCountButton } from "./use-animated-counter"
import { SquareButton } from "components/button"

const Example = () => {
    const {
        state,
        resetButtonProps,
        countButtonProps,
        animatedButtonProps,
    } = useAnimatedCounter({
        minCount: 0,
        step: 1,
        maxCount: 5,
        initialCount: 3,
    })

    const { atEndPosition, count, progressFraction } = state
    return (
        <DivBg1
            style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "10px",
                margin: "5px",
            }}
        >
            {atEndPosition ? (
                <SquareButton {...resetButtonProps}>
                    <ImCross />
                </SquareButton>
            ) : (
                <SquareButton {...countButtonProps}>
                    <FaRegStar />
                </SquareButton>
            )}

            <AnimatedCountButton {...animatedButtonProps} style={{ fontSize: "50px" }}>
                <div style={{ display: "flex", marginRight: "20px" }}>
                    {Array(count)
                        .fill(null)
                        .map((_, key) => {
                            return (
                                <SquareButton
                                    disabled={true}
                                    key={key}
                                    onClick={() => {}}
                                    style={{
                                        borderWidth: 0,
                                        color: "orange",
                                        backgroundColor: "rgba(0, 0, 0, 0)",
                                        opacity: progressFraction,
                                        fontSize: "30px",
                                    }}
                                >
                                    <FaStar />
                                </SquareButton>
                            )
                        })}
                </div>
            </AnimatedCountButton>
        </DivBg1>
    )
}

export default Example
