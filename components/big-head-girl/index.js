import { BorderedDiv } from "components/pretty-defaults"

const BigHeadGirlImage = ({ headSize }) => (
    <img
        src="https://bigheads.io/svg?accessory=none&body=breasts&circleColor=blue&clothing=vneck&clothingColor=red&eyebrows=serious&eyes=simple&faceMask=false&faceMaskColor=black&facialHair=none&graphic=react&hair=long&hairColor=black&hat=none&hatColor=red&lashes=false&lipColor=purple&mask=false&mouth=serious&skinTone=brown"
        alt="Big Head"
        height={`${headSize || 100}px`}
        width={`${headSize || 100}px`}
    />
)
const BigHeadNotice = ({ children, headSize, style }) => {
    return (
        <BorderedDiv style={{ borderStyle: "dashed", alignItems: "center", ...style }}>
            <div style={{ marginTop: "-15px" }}>
                <BigHeadGirlImage {...{ headSize }} />
            </div>
            <div>{children}</div>
        </BorderedDiv>
    )
}

export { BigHeadNotice, BigHeadGirlImage }
