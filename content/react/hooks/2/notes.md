## useRef

Clean up event handlers you have setup when your component is unmounted. We don't want
event handlers dangling around on DOM nodes that are no longer in the document. (memory leak)

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
