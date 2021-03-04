## Safely handling async operations

> Summary: Create a reusable async hook to fetch a unique character from the Rick and Morty API. Don't perform state updates to unmounted components. Avoid unneccessary network calls.

-   This is a variation of [KCD's exercise 2.3](https://advanced-react-hooks.netlify.app/2) of his Advanced React Hooks workshop. See his solution [here](https://github.com/kentcdodds/advanced-react-hooks/blob/main/src/final/02.extra-3.js).
-   Write a component that fetches a unique character from the [Rick and Morty API](https://rickandmortyapi.com/) given a user-supplied number (the character ID).
-   Add another button to fetch a random Rick and Morty character.
-   If the submitted number does not correspond to a character, show the error.
-   While fetching data, the input field, random button, and submit button should be disabled.
-   When the number currently in the input field has been submitted has been either `resolved` or `rejected`, disable the submit button unless the input the user changes it to a new value.
-   The user shoudn't be able to click the submit button if the character corresponding to the number in the input field is currently loaded (ie profile info shown on the screen).
-   Enable the user to mount and unmount this component (via a checkbox).
-   [KCD's Implementation](https://github.com/kentcdodds/advanced-react-hooks/blob/main/src/final/02.extra-3.js).

### Important!

(The paragraph below is paraphrased from [this page](https://advanced-react-hooks.netlify.app/2))

> Consider the scenario where we send an http request, and before the request finishes, we change our mind and navigate to a different page (or uncheck the mount checkbox). In that case, the component would get removed from the page ("unmounted") and when the request finally does complete, because the component has been removed from the page, we’ll get this warning from React:

> `Warning: Can't perform a React state update on an unmounted component. This is a no-op, but it indicates a memory leak in your application. To fix, cancel all subscriptions and asynchronous tasks in a useEffect cleanup function.`

⚠️❗❗⚠️ This warning should NOT pop up in our app. ⚠️❗❗⚠️

### My Solution

> Note: This solution doesn't use a library, but in most cases that you do. Use a library like [Tanner Linsley's React Query](https://github.com/tannerlinsley/react-query) to help do this instead of implementing everything on your own from scratch.

-   The `RickAndMortyInfoCard` in the code block below uses a `useSafeAsync` hook. It's responsible for managing the state, and fetching the data.
-   The `useSafeAsync` makes sure that the dispatch function would not run if the component is no longer mounted. The dispatch function returns the the data and state from the fetch function.
-   In other words, if the `RickAndMortyInfoCard` is no longer mounted, its state will no longer be updated (since it doesn't exist anymore)
-   The `runFunction` provided by `useSafeAsync` is the function that should run whenever data should be fetched. The `runFunction` takes in a promise and updates the state `{data, status error}`.
-   In our case,, the promise that we feed to the `runFunction` is the return value of the fetch function we call whenever we need to fetch something.

```jsx
function RickAndMortyInfoCard({ characterId, getStatus }) {
    const { data, status, error, runFunction } = useSafeAsync({
        status: characterId ? "pending" : "idle",
    })

    useEffect(() => {
        getStatus(status)
    }, [status, getStatus])

    useEffect(() => {
        if (!characterId) {
            return
        }
        runFunction(fetchRickAndMortyCharacterById(characterId))
    }, [characterId, runFunction])

    if (status === "idle") {
        return <IdleView />
    } else if (status === "pending") {
        return <PendingView />
    } else if (status === "rejected") {
        return <ErrorView message={error.message} />
    } else if (status === "resolved") {
        return <InfoView data={data} />
    }

    throw new Error("This should be impossible")
}
```

-   The `useSafeAsync` is a hook that optionally takes an initial state and `returns { status, data, error, runFunction}`. The state is just `{ status, data, error}`.
-   The `runFunction` is a function that accepts a promise and runs a dispatch function to update the state `{ status, data, error }`
-   This promise is assumed to be returned by the function you want to run. Example, you call it like this: `runFunction(fetchSomething(...))` where `fetchSomething(...)` returns a promise
-   This dispatch function is safe, meaning that the function will not run if the component that called it is unmounted
-   Notice that `useSafeAsync` uses `asyncReducer` and `useSafeDispatch` which i will discuss next.

```jsx
const useSafeAsync = initialState => {
    const [state, unsafeDispatch] = useReducer(asyncReducer, {
        status: "idle",
        data: null,
        error: null,
        ...initialState,
    })

    let dispatch = useSafeDispatch(unsafeDispatch)
    // if you uncomment the line below, this will be an unsafe async hook
    // dispatch = unsafeDispatch

    const { data, error, status } = state

    const runFunction = useCallback(
        promise => {
            dispatch({ status: "pending" })
            promise.then(
                data => dispatch({ status: "resolved", data, error: null }),
                error => dispatch({ status: "rejected", error, data: null })
            )
        },
        [dispatch]
    )

    const reset = useCallback(() => dispatch({ status: "idle" }), [dispatch])

    return { error, status, data, runFunction, reset }
}
```

`asyncReducer` is a private function that is only available to `useAsync`.

```js
idle or pending: { data: null, error: null }
rejected: { data: null, error }
resolved: { data, error: null}
```

⚠️❗❗⚠️ WARNING ⚠️❗❗⚠️: Be careful with this, you might want to write an asyncReducer that is more explicit like [how KCD implemented it](https://github.com/kentcdodds/advanced-react-hooks/blob/a449a2119e0b8ea9d90065cc80a00e68a6d4db8b/src/final/02.extra-3.js#L33).

```jsx
const asyncReducer = (_, nextState) => nextState
```

-   The `useSafeDispatch` takes a regular `unsafeDispatchFunction` and returns a function that guarantees that the dispatch function (which contains the fetch function) will not be called when the component is no longer mounted.
-   The trick is that we have an a reference that that keeps track where a component is mounted or not.
    If it is not mounted then the (safe) dispatch function will not do anything.
-   Bottomline:
    -   `useSafeDispatch` takes an `unsafeDispatchFunction` and returns a `safeDispatchFunction`
    -   The `unsafeDispatchFunction` is unsafe because it will run regardless of whether or not the component is mounted

```jsx
const useSafeDispatch = unsafeDispatchFunction => {
    const isMountedRef = useRef(false)

    // why use layout effect ?
    // this effect is called before the component is
    // shown on the screen, while use effect is called after
    // in our case:
    // we would want to switch (or ignore updates) as quickly as possible
    useLayoutEffect(() => {
        isMountedRef.current = true
        return () => (isMountedRef.current = false)
    })

    const safeDispatchFunction = useCallback(
        (...args) => {
            isMountedRef.current ? unsafeDispatchFunction(...args) : void 0
        },
        [unsafeDispatchFunction]
    )

    return safeDispatchFunction
}
```

Finally, the top level component

```jsx
function App() {
    const [state, setState] = useState({
        submittedValue: "",
        incompleteValue: "",
    })

    const [fetchStatus, setFetchStatus] = useState("idle")
    const { incompleteValue, submittedValue } = state

    const setIncompleteValue = value => setState({ ...state, incompleteValue: value })
    const setSubmittedValue = value => setState({ ...state, submittedValue: value })
    const setRandomValue = () => {
        const id = getRandomRickAndMortyCharacterId()
        setState({ submittedValue: id, incompleteValue: id })
    }

    const disabledByPending = fetchStatus === "pending"
    // the submit button is disabled when
    // 1. We are process of fetching data
    // 2. The input field value has already been resolved or rejected
    // 3. There is no value in the input field
    const submitButtonDisabled =
        disabledByPending ||
        !incompleteValue ||
        (incompleteValue === submittedValue &&
            ["resolved", "rejected"].includes(fetchStatus))

    return (
        <>
            <SingleFieldForm
                onSubmit={value => setSubmittedValue(value)}
                setValue={setIncompleteValue}
                value={incompleteValue}
            >
                <PositiveIntegerInputField disabled={disabledByPending} />
                <FormSubmit disabled={submitButtonDisabled}>Fetch</FormSubmit>
                <button
                    aria-label="Fetch a random rick and morty character"
                    onClick={setRandomValue}
                    disabled={disabledByPending}
                >
                    Get Random Character
                </button>
            </SingleFieldForm>
            <RickAndMortyInfoCard
                characterId={submittedValue}
                getStatus={setFetchStatus}
            />
        </>
    )
}
```
