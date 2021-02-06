import React from "react"

const {
    useRef,
    useState,
    useCallback,
    useEffect,
    useImperativeHandle,
    forwardRef,
} = React

// eslint-disable-next-line react/display-name
const ScrollableImperative = forwardRef(({ style }, ref) => {
    const divRef = useRef()

    useEffect(() => {
        scrollToBottom()
    })
    function scrollToTop() {
        divRef.current.scrollTop = 0
    }
    function scrollToBottom() {
        divRef.current.scrollTop = divRef.current.scrollHeight
    }

    useImperativeHandle(ref, () => ({
        scrollToTop,
        scrollToBottom,
    }))

    return (
        <div ref={divRef} style={{ ...style, overflowY: "auto" }}>
            Top <br />
            {Array.from(Array(1000).keys())
                .map(() => "this is really long")
                .join("")}
            <br />
            Bottom
        </div>
    )
})

const Scrollable = ({ style, scroll, setScroll }) => {
    const divRef = useRef()

    useEffect(() => {
        if (scroll === "top") {
            divRef.current.scrollTop = 0
        } else if (scroll === "bottom") {
            divRef.current.scrollTop = divRef.current.scrollHeight
        }
    }, [scroll, setScroll])

    return (
        <div ref={divRef} style={{ ...style, overflowY: "auto" }}>
            Top <br />
            {Array.from(Array(1000).keys())
                .map(() => "this is really long")
                .join("")}
            <br />
            Bottom
        </div>
    )
}

const BetterApp = () => {
    const scrollableRef = useRef()
    return (
        <div>
            <ScrollableImperative
                ref={scrollableRef}
                style={{ width: "200px", height: "200px", border: "1px solid red" }}
            />
            <button
                style={{ color: "white" }}
                onClick={scrollableRef.current.scrollToTop}
            >
                click to go to top
            </button>
            <br />
            <button
                style={{ color: "white" }}
                onClick={scrollableRef.current.scrollToBottom}
            >
                click to go to bottom
            </button>
        </div>
    )
}
const NormalApp = () => {
    const [state, setState] = useState({ scroll: "top" })

    const setScroll = useCallback(
        type => {
            setState({ scroll: type })
        },
        [setState]
    )

    return (
        <div>
            <Scrollable
                {...{
                    style: { width: "200px", height: "200px", border: "1px solid red" },
                    scroll: state.scroll,
                    setScroll,
                }}
            />
            <button style={{ color: "white" }} onClick={() => setScroll("top")}>
                click to go to top
            </button>
            <br />
            <button style={{ color: "white" }} onClick={() => setScroll("bottom")}>
                click to go to bottom
            </button>
        </div>
    )
}

const App = () => (
    <div>
        <NormalApp />
        <br />
        <BetterApp />
    </div>
)
export default App
