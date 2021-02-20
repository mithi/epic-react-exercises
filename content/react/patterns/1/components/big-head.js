import { BigHead } from "@bigheads/core"

const MITHI = {
    body: "breasts",
    eyebrows: "serious",
    eyes: "simple",
    faceMask: false,
    facialHair: "none",
    hair: "long",
    hairColor: "black",
    lashes: false,
    lipColor: "purple",
    mask: false,
    mouth: "serious",
    skinTone: "brown",
}

const AvatarHead = ({ specs }) => {
    const bigHeadProps = specs ? specs : MITHI
    return (
        <div
            style={{
                width: "100px",
                marginTop: "-10px",
                marginLeft: "-10px",
                display: "auto",
            }}
        >
            <BigHead {...bigHeadProps} faceMask={false} mask={false} />
        </div>
    )
}

export { AvatarHead }
