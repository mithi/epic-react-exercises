## [The Vanilla tilt Exercise](https://react-hooks.netlify.app/5)

-   Use `useRef` with [micku7zu/vanilla-tilt.js](https://micku7zu.github.io/vanilla-tilt.js/)

## Additional Notes

1.  DOM interactions

    -   Use `useRef`, `useEffect`
    -   `<div></div>` is just a syntactic sugar for `React.createElement()`, dom nodes are not created at all until `ReactDom.render()` is called.
    -   The `render` method has no access to the dom node by itself, it only creates and returns react elements
    -   To access the dom, use a special prop called `ref`
    -   `mounted`: A component that has rendered. That's when `useEffect` callback is called, by that point `ref.current` set to the dom node which you can directly do interactions, manipulations

2.  useRef
    -   Clean up event handlers you have setup when your component is unmounted.
    -   We don't want event handlers dangling around on DOM nodes that are no longer in the document. (memory leak)

```js

const MyFunctionComponent () => {
    const myDivRef = React.useRef()

    React.useEffect(() => {
        const myDiv = myDivRef.current
        // myDiv is the div DOM node!
        console.log(myDiv)
        return () => cleanUpHandlers();
    }, [])

    return <div ref={myDivRef}>hi</div>
}
```
