import VanillaTilt from "vanilla-tilt"
import { useEffect, useRef, useState } from "react"
import { useTheme } from "hooks"
const centeredStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    flexDirection: "column",
}

const tiltRootStyle = {
    height: "35vh",
    width: "50%",
    borderRadius: "15px",
    borderWidth: "3px",
    borderStyle: "dashed",
    ...centeredStyle,
}

const parentStyle = { ...centeredStyle, height: "55vh" }

const vanillaTiltOptions = {
    max: 25,
    perspective: 150,
}

const useTiltStyle = () => {
    const { primaryColor } = useTheme()
    return { ...tiltRootStyle, borderColor: primaryColor }
}

function Tilt({ children, setData }) {
    const divRef = useRef()
    const style = useTiltStyle()

    useEffect(() => {
        const node = divRef.current
        VanillaTilt.init(node, vanillaTiltOptions)
        node.addEventListener("tiltChange", event => setData(event.detail))
        return () => node.vanillaTilt.destroy()
    }, [setData])

    return (
        <div style={parentStyle}>
            <div ref={divRef} {...{ style }}>
                {children}
            </div>
        </div>
    )
}

const TiltDataDisplay = ({ data }) => {
    if (!data) {
        return (
            <p>
                Point here: <br />
                <span style={{ fontSize: "50px" }}>👇</span>
            </p>
        )
    }

    const { angle, percentageX, percentageY, tiltX, tiltY } = data
    return (
        <div style={{ position: "relative", fontSize: "12px" }}>
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
        </div>
    )
}

function App() {
    const [data, setData] = useState(null)

    return (
        <>
            <p>Touching the box will transform its perspective.</p>
            <Tilt {...{ setData }}>
                <TiltDataDisplay {...{ data }} />
            </Tilt>
        </>
    )
}

export default App
