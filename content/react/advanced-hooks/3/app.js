import React from "react"
import dynamic from "next/dynamic"
import { DefaultButton } from "components/button"
import Content from "./components/content"
import { useTheme } from "hooks"
import { BorderedDiv, OnClickText } from "components/pretty-defaults"
import { SpinnerDots } from "components/spinner"

const {
    useLayoutEffect,
    useRef,
    useState,
    useEffect,
    useImperativeHandle,
    forwardRef,
} = React

const DynamicMarkdownRender = dynamic(() => import("components/markdown-render"), {
    // eslint-disable-next-line react/display-name
    loading: () => <SpinnerDots />,
})

const Section = ({ children }) => {
    const { bodyClassNames } = useTheme()

    return (
        <div
            className={bodyClassNames[0]}
            style={{
                padding: "15px 10px",
                borderRadius: "15px",
                margin: "0px 10px",
                width: "90%",
            }}
        >
            {children}
        </div>
    )
}

const AppContainer = ({ children }) => {
    return (
        <BorderedDiv
            style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                borderStyle: "dotted",
                borderRadius: "20px",
            }}
        >
            {children}
        </BorderedDiv>
    )
}

const ScrollableImperative = forwardRef(function Scrollable({ children, style }, ref) {
    const divRef = useRef()
    const useNextEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect
    // if you comment out the line above and uncomment the line below, you will see flickering
    // when switching from ScrollableImplerative to ScrollableNormal and back
    //const useNextEffect = useEffect

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

const ScrollableNormal = ({ children, scroll, style }) => {
    const divRef = useRef()

    const useNextEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect
    // if you comment out the line above and uncomment the line below, you will see flickering
    // when switching from ScrollableImplerative to ScrollableNormal and back
    //const useNextEffect = useEffect

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
            <DefaultButton onClick={() => sRef.current.scrollToTop()}>
                go to top
            </DefaultButton>
            <Section>
                <ScrollableImperative
                    ref={sRef}
                    style={{ height: "200px", paddingRight: "15px" }}
                >
                    {<Content />}
                </ScrollableImperative>
            </Section>
            <DefaultButton onClick={() => sRef.current.scrollToBottom()}>
                go to bottom
            </DefaultButton>
        </AppContainer>
    )
}
const AppNormal = () => {
    const [scroll, setScroll] = useState({ scroll: "top" })

    return (
        <AppContainer>
            <DefaultButton onClick={() => setScroll("top")}>go to top</DefaultButton>
            <Section>
                <ScrollableNormal
                    style={{ height: "200px", paddingRight: "15px" }}
                    scroll={scroll}
                >
                    <Content />
                </ScrollableNormal>
            </Section>
            <DefaultButton onClick={() => setScroll("bottom")}>
                go to bottom
            </DefaultButton>
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
                marginTop: "20px",
                display: "flex",
                flexDirection: "column",
                fontSize: "12px",
            }}
        >
            {isImperativeApp ? <AppImperative /> : <AppNormal />}
            <DynamicMarkdownRender>{title}</DynamicMarkdownRender>
            <p style={{ fontSize: "12px" }}>
                <OnClickText onClick={() => setIsImperativeApp(!isImperativeApp)}>
                    Load the other component...
                </OnClickText>{" "}
                <br />
                (There should be no observable difference between the two components)
            </p>
        </div>
    )
}
export default App
