## [Http Request Exercise](https://react-hooks.netlify.app/6)

-   A form where users can enter the pokemon name and your app fetches that pokemon's data; show errors if any
-   Use status states (strings), do NOT derive from existing state or booleans. Show the following: `idle` no request made yet, `pending` request started, `resolved` request successful, `rejected` request
-   Use ONE state object ie `setState({status: 'resolved', pokemon})`, instead of several states (can you store this and use localStorage in a custom hook?), you can also try using `useReducer` instead of `useState`
-   Create an `ErrorBoundary` class component to handle errors the correct way.
-   Try using built-in `react-error-boundary` the right way; use `resetKeys` for better user experience

## Additional Notes

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
