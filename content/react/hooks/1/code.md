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

## Async with useEffect

You cannot return anything other than the cleanup function in `useEffect`, this means you can NOT use `async/await` for that cleanup function since that returns a promise.

```js
// case 1: this does not work, don't do this:
useEffect(async () => {
    const result = await doSomeAsyncThing()
    // do something with the result
})

// case 2: You can do this instead
useEffect(() => {
    async function effect() {
        const result = await doSomeAsyncThing()
        // do something with the result
    }

    effect()
})

// case 3: Or even better
useEffect(() => {
    doSomeAsyncThing().then(result => {
        // do something with the result
    })
})
```
