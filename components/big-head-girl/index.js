import { BigHead } from "@bigheads/core"
import { SmallSpan, BorderedDiv } from "components/pretty-defaults"

const BigHeadGirl = ({ size }) => (
    <div style={{ width: size, height: size }}>
        <BigHead
            accessory="none"
            body="breasts"
            circleColor="blue"
            clothing="vneck"
            clothingColor="red"
            eyebrows="serious"
            eyes="simple"
            faceMask={false}
            faceMaskColor="black"
            facialHair="none"
            graphic="react"
            hair="long"
            hairColor="black"
            hat="beanie"
            hatColor="red"
            lashes={false}
            lipColor="turqoise"
            mask={false}
            mouth="serious"
            skinTone="brown"
        />
    </div>
)

const BigHeadNotice = ({ children }) => {
    return (
        <>
            <BorderedDiv
                style={{
                    margin: "5px",
                    padding: "5px",
                    borderRadius: "10px",
                    borderStyle: "dotted",
                    display: "flex",
                }}
            >
                <BigHeadGirl size="70px" />
                <SmallSpan style={{ marginTop: "2px", padding: "5px" }}>
                    {children}
                </SmallSpan>
            </BorderedDiv>
        </>
    )
}

export { BigHeadNotice }
