## Exposing properties to the parent

> Summary: Create a scrollable component such that its parent could control whether the top part or the bottom part is shown. There shouldn't be any flickery jumpy behavior. Implement it twice, one with `useImperativeHandle` and `forwardRef`, the other without. State the difference between the two.

-   Write a `scrollable` component that, that takes in a specific `width` and `height` as props (via the `style` prop).
-   The content (passed through `children`) of that component must be larger than its height.
-   Each time the component mounts, the user should see the most bottom content, NOT the top OR the middle.
-   The parent of this `scrollable` component, must have two buttons: to scroll to the top and the bottom and the component.
-   Try implementing the same functionality twice. One using `useImperativeHandle` and `forwardRef` and the other, without using the two.
-   Explain the difference between the two implementations.
-   Will you use `useLayoutEffect` or `useEffect` for this? Explain why.

### My Solution

By using `useImperativeHandle` and `forwardRef` my implementation is like this:

```jsx
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

```jsx
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
```

If you don't use `useImperativeHandle` and `forwardRef` you may end up with a component like this:

```jsx
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

```jsx
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
```

### Thoughts

1. If we don't use `useImperativeHandle`

    - The parent component will manage the `scrollable` component's state
    - Scrolling up and down will cause rerendering of both the `scrollable` component and its parent component . Normally these things are okay, but it's added unnecessary complexity, which we don't want especially if the parent is also managing alot of things.
    - The `scrollable` component will not be very reusable, we need to add an additional state to any component that needs to use this `scrollable` component as their child.

2. Using `useImperativeHandle`

    - The parent component can customize an instance value that belongs to the child component.
    - The child component exposes properties via `useImperativeHandle`. The parent component must forward a `ref` (in our case we named it `sRef`), to the child component. The child uses `sRef` to expose the properties that the parent can access.
    - In this case, the properties exposed are the functions `scrollToTop` and `scrollToBottom`. Both functions manipulate the dom node the child renders
    - These properties are exposed via the line `useImperativeHandle(ref, () => ({ scrollToTop, scrollToBottom }))`.
    - The parent will be able to access the functions exposed to it like this ` sRef.current.scrollToBottom()`

3. Using `useLayoutEffect` vs `useEffect`
    - We need to scroll to the bottom when the component mounts
    - If `useEffect` is used, you would see a flicker, a jumpy behavior. Briefly, the screen will flash to show the contents at the top prior to scrolling to the bottom.
    - This won't happen with `useLayoutEffect` as the effect will be applied before the browser repaints, NOT after
    - Note: We can use a different strategy of creating a `useDidComponentMount` hook with `useEffect` if we really don't want to use `useLayoutEffect`

### Notes

-   `forwardRef` is a React feature that lets a component take a `ref` from its parent component
-   Keep in mind that `useRef` doesn’t notify you when its content changes. Mutating the `.current` property doesn’t cause a re-render

-   [Sophie Au: React Hooks: `useImperativeHandle`](https://sophieau.com/article/use-imperative-handle/)
-   [Mehdi Namvar: React’s `useImperativeHandle` by Examples](https://medium.com/@ilxanlar/useimperativehandle-by-examples-99cbdc8e3c3a)
-   [Chris: When to use `useImperativeHandle`, `useLayoutEffect`, and `useDebugValue`](https://stackoverflow.com/questions/57005663/when-to-use-useimperativehandle-uselayouteffect-and-usedebugvalue)

### Quotes

> `useImperativeHandle` customizes the instance value that is exposed to parent components when using `ref`. As always, imperative code using refs should be avoided in most cases. `useImperativeHandle` should be used with `forwardRef`.

> It allows us to expose imperative methods to developers who pass a ref prop to our component which can be useful when you have something that needs to happen and is hard to deal with declaratively.

> It gives you control over the value that is returned. Instead of returning the instance element, you explicitly state what the return value will be

> It allows you to replace native functions (such as blur, focus, etc) with functions of your own, thus allowing side-effects to the normal behavior, or a different behavior altogether.
