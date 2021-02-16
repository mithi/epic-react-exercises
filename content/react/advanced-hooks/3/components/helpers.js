import React from "react"
import { FaArrowAltCircleUp, FaArrowAltCircleDown } from "components/icons"
import { ColoredButton } from "components/button"
import { BorderedDiv, DivBg1 } from "components/pretty-defaults"

const Section = ({ children }) => {
    return (
        <DivBg1
            style={{
                padding: "15px 10px",
                borderRadius: "15px",
                margin: "10px",
                width: "90%",
                maxWidth: "300px",
            }}
        >
            {children}
        </DivBg1>
    )
}

const AppContainer = ({ children }) => {
    return (
        <BorderedDiv
            style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                borderStyle: "dotted",
                borderRadius: "20px",
                padding: "10px",
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
