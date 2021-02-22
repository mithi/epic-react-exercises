## Adding debug labels to hooks

> Create a hook to determine the window user's window screen size and update the view based on it. Use the `useDebugValue` hook so that when a component uses the hook three different times, you'll be able to differentiate them on the [The React DevTools browser extension](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en).

-   Show the current size of the window (`height` and `width`)
-   Checkout the [RobertBroersma/bigheads](https://github.com/RobertBroersma/bigheads) package, you'll use this in this exercise!
-   Generate three specific avatars, you can name it whatever you want. I named mine, `Mithi`, `Diana`, and `Mikong`. Each specific avatar must have fixed properties but except for `hat`, `hatColor`, `accessory`, `clothing`, `clothingColor` and `graphic`
-   Every time the screen size changes, an avatar's `hat`, `hatColor`, `accessory`, `clothing`, `clothingColor` and `graphic` should change (randomly).
-   Only one avatar should be shown for each screen width type, In my case, I show `Mithi` when the screen size is `big`, and `Diana` and `Mikong` for `medium` and `small` respectively. A big screen has a width above `1000px`, a small screen has a width below `700px` the rest are medium screens.
-   `useDebugValue` used to display a label for custom hooks in React DevTools. The custom hook should take in a minimum and maximum width, and return whether the current window size satisfies the condition.

### My implementation

Create a `useWindowSize` hook

```jsx
// Adapted from: https://usehooks.com/useWindowSize/
function useWindowSize() {
    // Initialize state with undefined width/height so server and client renders match
    const [windowSize, setWindowSize] = useState({ width: undefined, height: undefined })
    useDebugValue(`width: ${windowSize.width}px, height: ${windowSize.height}px`)

    useEffect(() => {
        const handleResize = () =>
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            })

        window.addEventListener("resize", handleResize)
        handleResize() // call it right away!

        return () => window.removeEventListener("resize", handleResize)
    }, [])

    return windowSize
}
```

And a `useWithinWindowWidth` hook

```jsx
function useWithinWindowWidth(minWidth, maxWidth) {
    const { width } = useWindowSize()

    const isWithin = width && width >= minWidth && width <= maxWidth
    useDebugValue({ minWidth, maxWidth, isWithin }, formatDebugValueWithinWindow)
    return isWithin
}

export { useWithinWindowWidth, useWindowSize }
```

Here's the function `useDebugValue` calls

```jsx
const formatDebugValueWithinWindow = ({ minWidth, maxWidth, isWithin }) => {
    if (maxWidth === Infinity) {
        return `(min-width: ${minWidth}px) => ${isWithin}`
    }
    if (minWidth === 0) {
        return `(max-width: ${maxWidth}px) => ${isWithin}`
    }
    return `(max-width: ${maxWidth}px) and (min-width: ${minWidth}px) => ${isWithin}`
}
```

Here's the component calling `useWithinWindowWidth`:

```jsx
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
        <div>
            {person}
            <PersonMessage {...{ state }} />
        </div>
    )
}
```

And finally the top level component:

```jsx
function App() {
    const { width, height } = useWindowSize()

    return (
        <div>
            <DisplaySize {...{ width, height }} />
            <PersonByWindowSize />
            <p>
                Resizing your window changes the clothes and accessories of the avatar. A
                specific avatar is shown depending whether your window is big, medium, or
                small.
            </p>
        </div>
    )
}
```

### Notes

From [React Docs](https://reactjs.org/docs/hooks-reference.html#usedebugvalue)

> We don’t recommend adding debug values to every custom Hook. It’s most valuable for custom Hooks that are part of shared libraries.
