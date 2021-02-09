import Image from "next/image"
import { SmallSpan, BorderedDiv } from "components/pretty-defaults"

const BigHeadNotice = ({ children }) => {
    return (
        <>
            <BorderedDiv
                style={{
                    padding: "5px",
                    borderRadius: "10px",
                    borderStyle: "dotted",
                    display: "flex",
                }}
            >
                <div style={{ padding: "5px" }}>
                    <Image
                        src="/android-chrome-512x512.png"
                        alt="Big Head Girl Epic Notes Logo"
                        width={75}
                        height={75}
                        quality={100}
                    />
                </div>

                <div
                    style={{
                        lineHeight: "0.85",
                        alignSelf: "center",
                        margin: "10px 20px 10px 0px",
                    }}
                >
                    <SmallSpan>{children}</SmallSpan>
                </div>
            </BorderedDiv>
        </>
    )
}

export { BigHeadNotice }
