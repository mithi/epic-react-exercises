import { BorderedDiv } from "components/pretty-defaults"

const BigHeadGirlImage = ({ headSize }) => (
    <img
        src="https://bigheads.io/svg?accessory=none&body=breasts&circleColor=blue&clothing=vneck&clothingColor=red&eyebrows=serious&eyes=simple&faceMask=false&faceMaskColor=black&facialHair=none&graphic=react&hair=long&hairColor=black&hat=none&hatColor=red&lashes=false&lipColor=purple&mask=false&mouth=serious&skinTone=brown"
        alt="Big Head"
        height={`${headSize}px`}
        width={`${headSize}px`}
    />
)

const BigHeadNotice = ({ children, headSize }) => {
    return (
        <BorderedDiv style={{ borderStyle: "dashed", alignItems: "center" }}>
            <div style={{ marginTop: "-10px" }}>
                <BigHeadGirlImage {...{ headSize }} />
            </div>
            <div>{children}</div>
        </BorderedDiv>
    )
}

export { BigHeadNotice, BigHeadGirlImage }
