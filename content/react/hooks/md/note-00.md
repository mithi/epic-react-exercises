## Notes

1.  [Why React hooks?](https://www.youtube.com/watch?v=zWsZcBiwgVE&list=PLV5CVI1eNcJgNqzNwcs4UKrlJdhfDjshf)

    -   35 minute talk by Kent C Dodds

2.  What are React hooks?

    -   Special functions that can store data (like state) or perform functions (side effects) among other things
    -   Can only be called inside react function component or other hooks.
    -   Name must start with `use`
    -   Common hooks: `useState`, `useEffect`, `useLayoutEffect`, `useRef`, `useContext`, `useReducer`, `useCallback`, `useMemo`

3.  [Hooks flow diagram](https://github.com/donavon/hook-flow)

    -   A diagram that shows when different hooks are called and the order in which they’re called (from Donavon)

4.  [Lift the state up](https://reactjs.org/docs/lifting-state-up.html)

    -   Technique to share code between two sibling components (from React Docs)

5.  [Don't sync states, derive it!](https://kentcdodds.com/blog/dont-sync-state-derive-it)

    -   It's usually better to calculate states (deriving) based on other states when you can as opposed to storing them (from Kent C Dodds Blog)

6.  DOM interactions

    -   Use `useRef`, `useEffect`
    -   `<div></div>` is just a syntactic sugar for `React.createElement()`, dom nodes are not created at all until `ReactDom.render()` is called.
    -   The `render` method has no access to the dom node by itself, it only creates and returns react elements
    -   To access the dom, use a special prop called `ref`
    -   A component that has rendered is is said to be `mounted`. That's when `useEffect` callback is called, by that point`ref.current` set to the dom node which you can directly do interactions, manipulations
    -   IMPORTANT: Clean up event handlers you have setup when your component is unmounted. We don't want
        event handlers dangling around on DOM nodes that are no longer in the document. (memory leak)

7.  HTTP Requests

    -   IMPORTANT: React batches state updates (`setState`)
    -   [Does React batch state update functions when using hooks?](https://stackoverflow.com/questions/53048495/does-react-batch-state-update-functions-when-using-hooks) (StackOverflow #53048495)
    -   If the state changes are triggered asynchronously (like wrapped in a promise), they will not be batched; if they are triggered directly, they will be batched.
    -   You cannot return anything other than the cleanup function in `useEffect`, this means you can NOT use `async/await` for that cleanup function since that returns a promise

## Exercises

1. [TicTacToe](https://react-hooks.netlify.app/4)

    - Note: Derive most states instead of storing them
    - Use local storage and custom hooks; do NOT use class components
    - Be able to pause a game, close the tab, and then resume the game later
    - Be able to keep a history of the game; allow players to go backward and forward in time

2. [Vanilla tilt](https://react-hooks.netlify.app/5)

    - Use `useRef` with [micku7zu/vanilla-tilt.js](https://micku7zu.github.io/vanilla-tilt.js/)

3. [Fetch Pokemons ](https://react-hooks.netlify.app/6)
    - [Stop Using `isLoading` booleans (Kent C Dodds Blog)](https://kentcdodds.com/blog/stop-using-isloading-booleans)
    - A form where users can enter the pokemon name and your app fetches that pokemon's data; show errors if any
    - Use status states (strings), do NOT derive from existing state or booleans. Show the following: `idle` no request made yet, `pending` request started, `resolved` request successful, `rejected` request
    - Use ONE state object ie `setState({status: 'resolved', pokemon})`, instead of several states (can you store this and use localStorage in a custom hook?), you can also try using `useReducer` instead of `useState`
    - Create an `ErrorBoundary` class component to handle errors the correct way.
    - Try using built-in `react-error-boundary` the right way; use `resetKeys` for better user experience

## Sample Code

```js
const myDivRef = React.useRef()

React.useEffect(() => {
    const myDiv = myDivRef.current
    // myDiv is the div DOM node!
    console.log(myDiv)
}, [])

return <div ref={myDivRef}>hi</div>
}
```

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
