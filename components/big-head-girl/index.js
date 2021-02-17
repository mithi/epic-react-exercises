import { BorderedDiv } from "components/pretty-defaults"

const BigHeadNotice = ({ children, headSize }) => {
    return (
        <BorderedDiv
            style={{
                padding: "5px",
                borderRadius: "10px",
                borderStyle: "dashed",
                display: "flex",
                alignItems: "center",
            }}
        >
            <div style={{ marginTop: "-5px" }}>
                <img
                    src="https://bigheads.io/svg?accessory=none&body=breasts&circleColor=blue&clothing=vneck&clothingColor=red&eyebrows=serious&eyes=simple&faceMask=false&faceMaskColor=black&facialHair=none&graphic=react&hair=long&hairColor=black&hat=none&hatColor=red&lashes=false&lipColor=purple&mask=false&mouth=serious&skinTone=brown"
                    alt="Big Head"
                    height={`${headSize}px`}
                    width={`${headSize}px`}
                />
            </div>
            <div>{children}</div>
        </BorderedDiv>
    )
}

export { BigHeadNotice }
