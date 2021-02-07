import { MdDesktopMac, MdLaptopMac, MdTabletMac } from "react-icons/md"
import { SmallSpan } from "components/pretty-defaults"
import { useWithinWindowWidth, useWindowSize } from "./components/hooks"
import { RandomHead, MITHI, DIANA, MIKONG } from "./components/big-head"
import { BigHeadMessage, DisplaySize } from "./components/helpers"

const POSSIBLE_STATES = {
    small: { name: "Mikong", size: "small", icon: <MdTabletMac /> },
    medium: { name: "Diana", size: "medium", icon: <MdLaptopMac /> },
    big: { name: "Mithi", size: "big", icon: <MdDesktopMac /> },
}

function PersonByWindowSize() {
    const isBig = useWithinWindowWidth(1000, Infinity)
    const isMedium = useWithinWindowWidth(700, 999)
    const isSmall = useWithinWindowWidth(0, 699)

    let person = null
    let state = null
    if (isBig) {
        person = <RandomHead person={MITHI} />
        state = POSSIBLE_STATES.big
    } else if (isMedium) {
        person = <RandomHead person={DIANA} />
        state = POSSIBLE_STATES.medium
    } else if (isSmall) {
        person = <RandomHead person={MIKONG} />
        state = POSSIBLE_STATES.small
    }

    return (
        <div style={{ display: "flex" }}>
            {person}
            <BigHeadMessage {...{ state }} />
        </div>
    )
}

function App() {
    const { width, height } = useWindowSize()

    return (
        <div>
            <DisplaySize {...{ width, height }} />
            <PersonByWindowSize />
            <SmallSpan>
                *Resizing your window changes the clothes and accessories of the avatar.
                <br />
                *The avatar shown is based on whether your window is big, medium, or
                small.
            </SmallSpan>
        </div>
    )
}

export default App
