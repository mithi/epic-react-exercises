import { FaHeart, ImCross } from "components/icons"
import { DivBg1 } from "components/pretty-defaults"
import { useAnimatedCounter, AnimatedCountButton } from "./use-animated-counter"
import { PrettyHeader } from "components/pretty-defaults"
import { SquareButton } from "components/button"

const Example = () => {
    const {
        state,
        countProps,
        resetButtonProps,
        animatedButtonProps,
    } = useAnimatedCounter({
        minCount: 0,
        step: 1,
        maxCount: 20,
        initialCount: 16,
    })

    const { atStartPosition, atEndPosition } = state
    return (
        <div style={{ margin: "5px", width: "100px" }}>
            <DivBg1
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    height: "150px",
                }}
            >
                <PrettyHeader {...countProps} />
                <AnimatedCountButton
                    {...animatedButtonProps}
                    style={{
                        fontSize: "50px",
                        color: atStartPosition ? "gray" : atEndPosition ? "red" : "pink",
                    }}
                >
                    <FaHeart />
                </AnimatedCountButton>

                {!atStartPosition && (
                    <SquareButton
                        {...resetButtonProps}
                        style={{
                            borderRadius: "50%",
                            fontSize: "8px",
                            width: "16px",
                            height: "16px",
                            marginTop: "-10px",
                        }}
                    >
                        <ImCross />
                    </SquareButton>
                )}
            </DivBg1>
        </div>
    )
}

export default Example
