import { BigHead } from "@bigheads/core"
import { BorderedDiv } from "components/pretty-defaults"

const MIKONG = {
    body: "chest",
    eyebrows: "angry",
    eyes: "content",
    faceMask: false,
    facialHair: "stubble",
    hair: "buzz",
    hairColor: "black",
    lashes: false,
    lipColor: "purple",
    mask: false,
    mouth: "openSmile",
    skinTone: "light",
}

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

const DIANA = {
    body: "breasts",
    eyebrows: "leftLowered",
    eyes: "leftTwitch",
    faceMask: false,
    faceMaskColor: "black",
    facialHair: "none",
    hair: "afro",
    hairColor: "blue",
    lashes: true,
    lipColor: "green",
    mask: false,
    mouth: "lips",
    skinTone: "light",
}

const RandomHead = ({ person }) => (
    <div>
        <BorderedDiv
            style={{
                borderRadius: "25%",
                width: "125px",
                height: "125px",
                margin: "10px",
            }}
        >
            <BigHead {...person} />
        </BorderedDiv>
    </div>
)

export { RandomHead, MIKONG, MITHI, DIANA }
