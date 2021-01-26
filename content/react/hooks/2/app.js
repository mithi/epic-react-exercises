import VanillaTilt from "vanilla-tilt"
import { useEffect, useRef, useState } from "react"
import { useContext } from "react"
import { ThemeContext } from "providers"

const centeredStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    flexDirection: "column",
}

const tiltRootStyle = {
    height: "50vh",
    width: "50%",
    borderRadius: "15px",
    ...centeredStyle,
}

const parentStyle = { ...centeredStyle, height: "80vh" }

const vanillaTiltOptions = {
    max: 25,
    perspective: 150,
}

function Tilt({ children, setData }) {
    const divRef = useRef()
    const { primaryColor } = useContext(ThemeContext)
    const style = { ...tiltRootStyle, border: `3px dashed ${primaryColor}` }

    useEffect(() => {
        const node = divRef.current
        VanillaTilt.init(node, vanillaTiltOptions)
        node.addEventListener("tiltChange", event => setData(event.detail))
        return () => node.vanillaTilt.destroy()
    }, [])

    return (
        <div ref={divRef} {...{ style }}>
            {children}
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
            <p>Entering the box will transform its perspective.</p>

            <div style={parentStyle}>
                <Tilt {...{ setData }}>
                    <TiltDataDisplay {...{ data }} />
                </Tilt>
            </div>
        </>
    )
}

export default App
