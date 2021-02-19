import VanillaTilt from "vanilla-tilt"
import { useEffect, useRef, useState } from "react"
import { useTheme } from "providers"
import { SmallSpan, PrettyHeader } from "components/pretty-defaults"

const centeredStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    flexDirection: "column",
}

const useTiltStyle = () => {
    const { primaryColor } = useTheme()
    return {
        height: "35vh",
        width: "50%",
        borderRadius: "15px",
        borderWidth: "3px",
        borderStyle: "dashed",
        ...centeredStyle,
        borderColor: primaryColor,
    }
}

const vanillaTiltOptions = {
    max: 25,
    perspective: 150,
}

function Tilt({ children, setData, style }) {
    const divRef = useRef()

    useEffect(() => {
        const node = divRef.current
        VanillaTilt.init(node, vanillaTiltOptions)
        node.addEventListener("tiltChange", event => setData(event.detail))
        return () => node.vanillaTilt.destroy()
    }, [setData])

    return (
        <div ref={divRef} {...{ style }}>
            {children}
        </div>
    )
}

const TiltDataDisplay = ({ data }) => {
    if (!data) {
        return (
            <PrettyHeader>
                point here: <br />
                👇
            </PrettyHeader>
        )
    }

    const { angle, percentageX, percentageY, tiltX, tiltY } = data
    return (
        <SmallSpan style={{ position: "relative" }}>
            angle: {angle.toFixed(2)}
            <br />
            percentX: {percentageX.toFixed(2)}
            <br />
            percentY: {percentageY.toFixed(2)}
            <br />
            tiltX: {tiltX}
            <br />
            tiltY: {tiltY}
            <br />
        </SmallSpan>
    )
}

function App() {
    const [data, setData] = useState(null)
    const style = useTiltStyle()

    return (
        <>
            <p>Touching the box will transform its perspective.</p>
            <div style={{ ...centeredStyle, height: "55vh" }}>
                <Tilt {...{ setData, style }}>
                    <TiltDataDisplay {...{ data }} />
                </Tilt>
            </div>
        </>
    )
}

export default App
