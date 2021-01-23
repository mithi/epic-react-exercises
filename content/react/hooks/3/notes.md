## [The Http Request Exercise](https://react-hooks.netlify.app/6)

-   A form where users can enter the pokemon name and your app fetches that pokemon's data; show errors if any
-   Use status states (strings), do NOT derive from existing state or booleans. Show the following: `idle` no request made yet, `pending` request started, `resolved` request successful, `rejected` request
-   Use ONE state object ie `setState({status: 'resolved', pokemon})`, instead of several states you can also try using `useReducer` instead of `useState`
-   Create an `ErrorBoundary` class component to handle errors the correct way.

### Things to think about

-   Can you store this and use localStorage in a custom hook?
-   Try using built-in `react-error-boundary` the right way; use `resetKeys` for better user experience

## Additional Notes

1. HTTP Requests

    - IMPORTANT: React batches state updates (`setState`)
    - [Does React batch state update functions when using hooks?](https://stackoverflow.com/questions/53048495/does-react-batch-state-update-functions-when-using-hooks) (StackOverflow #53048495)
    - If the state changes are triggered asynchronously (like wrapped in a promise), they will not be batched; if they are triggered directly, they will be batched.

2. Kent C Dodds: [Stop Using `isLoading` booleans](https://kentcdodds.com/blog/stop-using-isloading-booleans)

### Using async/await in useEffect

-   You cannot return anything other than the cleanup function in `useEffect`, this means you can NOT use `async/await` for that cleanup function since that returns a promise.

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

### How to handle promise errors

-   Using `.catch` means that you’ll handle an error in the fetchPokemon promise, but you’ll also handle an error in the `setPokemon(pokemon)`.
-   Using `.then` only means that you will catch an error that happens in `fetchPokemon` only.

```js
// option 1: using .catch
fetchPokemon(pokemonName)
    .then(pokemon => setPokemon(pokemon))
    .catch(error => setError(error))

// option 2: using the second argument to .then
fetchPokemon(pokemonName).then(
    pokemon => setPokemon(pokemon),
    error => setError(error)
)
```
