## [The Vanilla Tilt Exercise](https://react-hooks.netlify.app/5)

-   Transform the perspective of a container on enter with [micku7zu/vanilla-tilt.js](https://micku7zu.github.io/vanilla-tilt.js/)
-   Display the details of the perspective transform as it happens
-   Remember: We don't want event handlers dangling around on DOM nodes that are no longer in the document. (memory leak)

### My Solution

```jsx
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

function App() {
    const [data, setData] = useState(null)

    return (
        <>
            <p>Touching the box will transform its perspective.</p>
            <div style={parentStyle}>
                <Tilt style={tiltStyle}>
                    <TiltDataDisplay {...{ data }} />
                </Tilt>
            </div>
        </>
    )
}
```

### Notes

1.  DOM interactions

    -   `<div></div>` is just a syntactic sugar for `React.createElement()`, dom nodes are not created at all until `ReactDom.render()` is called.
    -   The `render` method has no access to the dom node by itself, it only creates and returns react elements
    -   To access the dom, use a special prop called `ref`
    -   A component that has rendered is said to be `mounted`. That's when `useEffect` callback is called. By that point `ref.current` is set to the dom node which you can directly do interactions, manipulations...

2.  ❗ ❗[Ref Forwarding](https://reactjs.org/docs/forwarding-refs.html)

    -   ❗ ❗You CANNOT pass `ref` to a component as a prop the usual way that you might think
    -   Ref forwarding is an opt-in feature that lets some components take a ref they receive, and pass it further down (in other words, “forward” it) to a child.

3.  Other interesting libraries that manipulate the dom

    -   [yoannmoinet/nipplejs](https://github.com/yoannmoinet/nipplejs)
    -   [hammer.js](https://github.com/hammerjs/hammer.js)

4.  Further Reading

    -   [ Tyler McGinnis: Understanding React's useRef Hook](https://ui.dev/useref/)
    -   [Eloquent Javascript: Events](https://eloquentjavascript.net/15_event.html)
    -   [MDN Docs: Events](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Events)
    -   [MDN Docs: Events (refefence)](https://developer.mozilla.org/en-US/docs/Web/Events)
    -   [rehooks/awesome-react-hooks](https://github.com/rehooks/awesome-react-hooks)
