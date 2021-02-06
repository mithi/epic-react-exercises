## A scrollable component

-   Write a `scrollable` component that, that takes in a specific `width` and `height` as props (via the `style` prop),.
-   The content (passed through `children`) of that component must be larger than its width and height.
-   Each time the component mounts, the user should see the most bottom content, NOT the top of the middle.
-   The parent of this `scrollable` component, must have two buttons one for scrolling to the top and the bottom and the component.
-   Try implementing the same functionality twice. One using `useImperativeHandle` and `forwardRef` and the other, without using the two.
-   Explain the difference between the two implementations.
-   Will you use `useLayoutEffect` or `useEffect` for this? Explain why.

### My Implementation

By using `useImperativeHandle` and `forwardRef` my implementation is like this:

```js
const ScrollableImperative = forwardRef(function Scrollable({ children, style }, ref) {
    const divRef = useRef()

    useLayoutEffect(() => {
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
```

You call the component like this:

```js
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
                    <Content />
                </ScrollableImperative>
            </Section>
            <DefaultButton onClick={() => sRef.current.scrollToBottom()}>
                go to bottom
            </DefaultButton>
        </AppContainer>
    )
}
```

If you don't use `useImperativeHandle` and `forwardRef` you may end up with a component like this:

```js
const ScrollableNormal = ({ children, scroll, style }) => {
    const divRef = useRef()

    useLayoutEffect(() => {
        divRef.current.scrollTop = divRef.current.scrollHeight
    }, [])

    useLayoutEffect(() => {
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
```

And you will call the above like this:

```js
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
```

-   If we don't use `useImperativeHandle`, the parent component would be the one that would manage
    the state of the `scrollable` component.
-   Not using `useImperativeHandle` would also cause rerendering of both the `scrollable` component and its parent component every single time we scroll up and down. Normal this things are okay, but it's added unnecessary complexity especially if the parent is also managing alot of things.
-   Also, a component not using `useImperativeHandle` would not be very reusable, will be adding an additional state everytime to any component who wants to use it as their child.
-   Use `useImperativeHandle` if you want to let the parent component customize an instance value that belongs to the child component.
-   The child component can expose them via `useImperativeHandle`. The parent component must forward a `ref` (in this case we call it `sRef`) to the child component (`scrollable`) and the child uses that `sRef` to expose the properties that the parents could have access to.
-   In this case, the properties are the functions `scrollToTop` and `scrollToBottom` functions... Both functions manipulate the dom node the child renders, these functions make use of variables local only to `scrollable` (that normally the parent won't have access to).
-   These properties are exposed via the line `useImperativeHandle(ref, () => ({ scrollToTop, scrollToBottom }))`.
-   The parent will be able to access the functions exposed to it (by `useImperativeHandle`) like this ` sRef.current.scrollToBottom()` where `sRef` is the `ref` that the parent forwarded to the `scrollable` child.

-   On another note, this example, is one of the few cases that `useLayoutEffect` should be used instead of `useEffect`. If `useEffect` is used to scroll to the bottom when the component mounts, you would see a flicker, jumpy behavior. Briefly the screen will flash to show the contents prior to scrolling to the bottom on each rerender, which is not what we want. This won't happen with `useLayoutEffect` as the affect will be applied before the browser repaints, NOT after.

### You should know this

-   `forwardRef` is a React feature that lets a component take a `ref` from its parent component
-   Keep in mind that `useRef` doesn’t notify you when its content changes. Mutating the `.current` property doesn’t cause a re-render

### Other useImperativeHandle examples

-   [Sophie Au: React Hooks: `useImperativeHandle`](https://sophieau.com/article/use-imperative-handle/)
-   [Mehdi Namvar: React’s `useImperativeHandle` by Examples](https://medium.com/@ilxanlar/useimperativehandle-by-examples-99cbdc8e3c3a)
-   [Chris: When to use `useImperativeHandle`, `useLayoutEffect`, and `useDebugValue`](https://stackoverflow.com/questions/57005663/when-to-use-useimperativehandle-uselayouteffect-and-usedebugvalue)
