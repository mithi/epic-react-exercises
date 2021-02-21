import { FaArrowAltCircleUp, FaArrowAltCircleDown } from "components/icons"
import { ColoredButton } from "components/button"
import { BorderedDiv, DivBg1 } from "components/pretty-defaults"

const Section = ({ children }) => {
    return <DivBg1 style={{ maxWidth: "300px" }}>{children}</DivBg1>
}

const AppContainer = ({ children }) => {
    return (
        <BorderedDiv
            style={{
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                borderStyle: "dashed",
            }}
        >
            {children}
        </BorderedDiv>
    )
}

const TopButton = ({ onClick }) => (
    <ColoredButton {...{ onClick }}>
        <FaArrowAltCircleUp />
        <span style={{ margin: "0px 10px" }}>scroll to top</span>
        <FaArrowAltCircleUp />
    </ColoredButton>
)

const BottomButton = ({ onClick }) => (
    <ColoredButton {...{ onClick }}>
        <FaArrowAltCircleDown />
        <span style={{ margin: "0px 10px" }}>scroll to bottom</span>
        <FaArrowAltCircleDown />
    </ColoredButton>
)

export { Section, AppContainer, TopButton, BottomButton }
