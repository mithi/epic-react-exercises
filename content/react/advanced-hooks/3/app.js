import React from "react"
import { DynamicMarkdownRender } from "components/markdown-render/dynamic"
import Content from "./components/content"
import { OnClickText } from "components/pretty-defaults"
import { TopButton, BottomButton, AppContainer, Section } from "./components/helpers"
import { SmallSpan } from "components/pretty-defaults"
const {
    useLayoutEffect,
    useRef,
    useState,
    useEffect,
    useImperativeHandle,
    forwardRef,
} = React

// if you use useEffect instead, you'd see the flicker
// when switching from ScrollableImplerative to ScrollableNormal and back
const ScrollableImperative = forwardRef(function Scrollable({ children, style }, ref) {
    const divRef = useRef()
    const useNextEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect

    useNextEffect(() => {
        scrollToBottom()
    }, [])

    const scrollToTop = () => (divRef.current.scrollTop = 0)
    const scrollToBottom = () => (divRef.current.scrollTop = divRef.current.scrollHeight)

    useImperativeHandle(ref, () => ({ scrollToTop, scrollToBottom }))

    return (
        <div ref={divRef} tabIndex="0" style={{ ...style, overflowY: "auto" }}>
            {children}
        </div>
    )
})

// if you use useEffect instead, you'd see the flicker
// when switching from ScrollableImplerative to ScrollableNormal and back
const ScrollableNormal = ({ children, scroll, style }) => {
    const divRef = useRef()

    const useNextEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect

    useNextEffect(() => {
        divRef.current.scrollTop = divRef.current.scrollHeight
    }, [])

    useEffect(() => {
        if (scroll === "top") {
            divRef.current.scrollTop = 0
        } else if (scroll === "bottom") {
            divRef.current.scrollTop = divRef.current.scrollHeight
        }
    }, [scroll])

    return (
        <div ref={divRef} tabIndex="0" style={{ ...style, overflowY: "auto" }}>
            {children}
        </div>
    )
}

const AppImperative = () => {
    const sRef = useRef()
    return (
        <AppContainer>
            <TopButton onClick={() => sRef.current.scrollToTop()} />
            <Section>
                <ScrollableImperative
                    ref={sRef}
                    style={{ height: "225px", paddingRight: "15px" }}
                >
                    {<Content />}
                </ScrollableImperative>
            </Section>
            <BottomButton onClick={() => sRef.current.scrollToBottom()} />
        </AppContainer>
    )
}

const AppNormal = () => {
    const [scroll, setScroll] = useState({ scroll: "top" })

    return (
        <AppContainer>
            <TopButton onClick={() => setScroll("top")} />
            <Section>
                <ScrollableNormal
                    style={{ height: "225px", paddingRight: "15px" }}
                    scroll={scroll}
                >
                    <Content />
                </ScrollableNormal>
            </Section>
            <BottomButton onClick={() => setScroll("bottom")} />
        </AppContainer>
    )
}

const App = () => {
    const [isImperativeApp, setIsImperativeApp] = useState(true)

    const title = isImperativeApp
        ? "(This uses BOTH `forwardRef` and `useImperativeHandle` ) "
        : "(This does NOT use `forwardRef` or `useImperativeHandle` )"

    return (
        <div
            style={{
                marginTop: "0px",
                display: "flex",
                flexDirection: "column",
            }}
        >
            {isImperativeApp ? <AppImperative /> : <AppNormal />}
            <DynamicMarkdownRender>{title}</DynamicMarkdownRender>
            <SmallSpan>
                <OnClickText onClick={() => setIsImperativeApp(!isImperativeApp)}>
                    Click this to load the other component.
                </OnClickText>{" "}
                <br />
                (There should be no observable difference between the two components)
            </SmallSpan>
        </div>
    )
}
export default App
