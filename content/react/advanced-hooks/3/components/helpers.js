import React from "react"
import { FaArrowAltCircleUp, FaArrowAltCircleDown } from "components/icons"
import { DefaultButton } from "components/button"
import { useTheme } from "hooks"
import { BorderedDiv } from "components/pretty-defaults"

const Section = ({ children }) => {
    const { bodyClassNames } = useTheme()

    return (
        <div
            className={bodyClassNames[0]}
            style={{
                padding: "15px 10px",
                borderRadius: "15px",
                margin: "0px 10px",
                width: "90%",
                maxWidth: "300px",
            }}
        >
            {children}
        </div>
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
            }}
        >
            {children}
        </BorderedDiv>
    )
}

const TopButton = ({ onClick }) => (
    <DefaultButton {...{ onClick }}>
        <FaArrowAltCircleUp />
        <span style={{ margin: "0px 10px" }}>scroll to top</span>
        <FaArrowAltCircleUp />
    </DefaultButton>
)

const BottomButton = ({ onClick }) => (
    <DefaultButton {...{ onClick }}>
        <FaArrowAltCircleDown />
        <span style={{ margin: "0px 10px" }}>scroll to bottom</span>
        <FaArrowAltCircleDown />
    </DefaultButton>
)

export { Section, AppContainer, TopButton, BottomButton }
