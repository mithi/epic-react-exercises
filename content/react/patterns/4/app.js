import { SquareButton } from "components/button"
import { FaPlus, FaTimes } from "components/icons"
import { PrettyHeader } from "components/pretty-defaults"
import useAnimatedCounter from "./components/use-animated-counter"
import { AnimatedCountButton } from "../3/components/use-animated-counter"
import { useTheme } from "providers"

/**
SVG taken from: https://github.com/Kikobeats/react-clap-button/blob/master/src/components/ClapIcon.js
*/

const ClapIcon = ({ primaryColor }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="100px"
        viewBox="-549 338 100.1 125"
        style={{
            padding: "10px",
            color: primaryColor,
            margin: "10px",
        }}
        fill={"none"}
        strokeWidth="2px"
        stroke={primaryColor}
    >
        <path d="M-471.2 366.8c1.2 1.1 1.9 2.6 2.3 4.1.4-.3.8-.5 1.2-.7 1-1.9.7-4.3-1-5.9-2-1.9-5.2-1.9-7.2.1l-.2.2c1.8.1 3.6.9 4.9 2.2zm-28.8 14c.4.9.7 1.9.8 3.1l16.5-16.9c.6-.6 1.4-1.1 2.1-1.5 1-1.9.7-4.4-.9-6-2-1.9-5.2-1.9-7.2.1l-15.5 15.9c2.3 2.2 3.1 3 4.2 5.3zm-38.9 39.7c-.1-8.9 3.2-17.2 9.4-23.6l18.6-19c.7-2 .5-4.1-.1-5.3-.8-1.8-1.3-2.3-3.6-4.5l-20.9 21.4c-10.6 10.8-11.2 27.6-2.3 39.3-.6-2.6-1-5.4-1.1-8.3z" />
        <path d="M-527.2 399.1l20.9-21.4c2.2 2.2 2.7 2.6 3.5 4.5.8 1.8 1 5.4-1.6 8l-11.8 12.2c-.5.5-.4 1.2 0 1.7.5.5 1.2.5 1.7 0l34-35c1.9-2 5.2-2.1 7.2-.1 2 1.9 2 5.2.1 7.2l-24.7 25.3c-.5.5-.4 1.2 0 1.7.5.5 1.2.5 1.7 0l28.5-29.3c2-2 5.2-2 7.1-.1 2 1.9 2 5.1.1 7.1l-28.5 29.3c-.5.5-.4 1.2 0 1.7.5.5 1.2.4 1.7 0l24.7-25.3c1.9-2 5.1-2.1 7.1-.1 2 1.9 2 5.2.1 7.2l-24.7 25.3c-.5.5-.4 1.2 0 1.7.5.5 1.2.5 1.7 0l14.6-15c2-2 5.2-2 7.2-.1 2 2 2.1 5.2.1 7.2l-27.6 28.4c-11.6 11.9-30.6 12.2-42.5.6-12-11.7-12.2-30.8-.6-42.7m18.1-48.4l-.7 4.9-2.2-4.4m7.6.9l-3.7 3.4 1.2-4.8m5.5 4.7l-4.8 1.6 3.1-3.9" />
    </svg>
)

function App() {
    const { nextPageTheme, nextColor, nextHeaderFont, primaryColor } = useTheme()
    const {
        countProps,
        getCountButtonProps,
        getResetButtonProps,
        getAnimatedButtonProps,
    } = useAnimatedCounter({
        minCount: 0,
        maxCount: 50,
        step: 1,
    })

    const squareButtonStyle = {
        borderRadius: "50%",
        borderWidth: 0,
        fontSize: "30px",
        backgroundColor: "rgba(0, 0, 0, 0)",
    }
    return (
        <div
            style={{
                display: "flex",
                margin: "5px",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <SquareButton
                {...getResetButtonProps({
                    onClick: nextPageTheme,
                    title: "click this to reset counter and change the page theme",
                    style: squareButtonStyle,
                })}
            >
                <FaTimes />
            </SquareButton>
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                }}
            >
                <AnimatedCountButton
                    {...getAnimatedButtonProps({
                        onClick: nextColor,
                        title:
                            "click this to increment counter and change the primary color",
                    })}
                >
                    <ClapIcon {...{ primaryColor }} />
                </AnimatedCountButton>
                <PrettyHeader
                    {...countProps}
                    style={{
                        textAlign: "center",
                        marginTop: "-20px",
                        color: primaryColor,
                    }}
                />
            </div>

            <SquareButton
                {...getCountButtonProps({
                    onClick: nextHeaderFont,
                    title: "click this to increment counter and change the header font",
                    style: squareButtonStyle,
                })}
            >
                <FaPlus />
            </SquareButton>
        </div>
    )
}

export default App
