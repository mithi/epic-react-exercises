export default `/******************************
 * USE REF
 ******************************/

const MyFunctionComponent () => {
    const myDivRef = React.useRef()

    React.useEffect(() => {
        const myDiv = myDivRef.current
        // myDiv is the div DOM node!
        console.log(myDiv)
    }, [])

    return <div ref={myDivRef}>hi</div>
}

// this comment is here to demonstrate an extremely long line length, well beyond what you should probably allow in your own code, though sometimes you'll be highlighting code you can't refactor, which is unfortunate but should be handled gracefully


/******************************
 * USE EFFECT
 ******************************/


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

`
