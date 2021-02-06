# [The useSafeAsync Exercise](https://advanced-react-hooks.netlify.app/2)

-   This is a variation of [Kent's exercise 2.3](https://github.com/kentcdodds/advanced-react-hooks/blob/main/src/final/02.extra-3.js) of his Advanced React Hooks workshop.
-   Write an component that fetches a unique character from the [Rick and Morty API](https://rickandmortyapi.com/) given a number that's supplied by the user (the character ID).
-   There should also be a "random button", such that when clicked, will fetch a random Rick and Morty character.
-   If the number that was submitted does not correspond to a character, show the error.
-   While fetching a new character, the input field, random button, and submit button should be disabled.
-   When the number currently in the input field has been submitted has been either `resolved` or `rejected`, disable the submit button unless the input the user changes it to a new value. The user shoudn't be able to click the submit button if the character corresponding to the number in the input field is currently loaded.
-   The app must also enable the user to mount and unmount this component (via a checkbox).
-   [Kent's Implementation](https://github.com/kentcdodds/advanced-react-hooks/blob/main/src/final/02.extra-3.js). NOTE: his `utils` directory houses a slightly different [implementation](https://github.com/kentcdodds/advanced-react-hooks/blob/main/src/utils.js), giving the user two additional functions `setError` and `setData`, which allows the user to (you guessed it) set the `data` and `error` stored in the `useAsync` hook.
-   My Implementation: The [top level app](https://github.com/mithi/epic-notes/blob/main/content/react/advanced-hooks/1/app.js) and its [components](https://github.com/mithi/epic-notes/tree/main/content/react/advanced-hooks/1/components)

## Important!

(The paragraph below is paraphrased from [this page](https://advanced-react-hooks.netlify.app/2))

> Consider the scenario where we send an http request, and before the request finishes, we change our mind and navigate to a different page (or uncheck the mount checkbox). In that case, the component would get removed from the page ("unmounted") and when the request finally does complete, because the component has been removed from the page, we’ll get this warning from React:

```
Warning: Can't perform a React state update on an unmounted component.
This is a no-op, but it indicates a memory leak in your application.
To fix, cancel all subscriptions and asynchronous tasks in a useEffect cleanup function.
```

This warning should NOT pop up in our app.

## My Implementation

-   See `RickAndMortyInfoCard` in the codeblock below.
-   It uses a `useSafeAsync` hook that's responsible for managing the state, and fetching the data.
-   The hook makes sure that the dispatch function (that returns the the data and state from the fetch function) would not be run if the component is no longer mounted.
-   In other words, if the `RickAndMortyInfoCard` is no longer mounted, its state will no longer be updated (since it doesn't exist anymore)
-   The `runFunction` provided by `useSafeAsync` is the function that we should run whenever we want to fetch the data. The `runFunction` takes in a promise and updates the state `{data, status error}`.
-   In our case, the promise that we feed to the `runFunction` is the return value of the `fetchFunction`
    we call whenever we need to fetch something.

```js
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
        runFunction(delayedFetchRickAndMortyCharacterById(characterId))
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

-   The `useAsync` is a hook that optionally takes an initial state and `returns { status, data, error, runFunction}`. The state is just `{ status, data, error}`.
-   The `runFunction` is a function that accepts a promise and runs a dispatch function to update the state `{ status, data, error }`
-   This promise is assumed to be returned by the function you want to run such as a fetch function: So you call it like this: `runFunction(fetchSomething(...))` where `fetchSomething(...)` returns a promise
-   This dispatch function is safe, meaning that it will not run if the component that called it is unmounted
-   Notice that `useSafeAsync` uses `asyncReducer` and `useSafeDispatch` which i will discuss next.

```js
const useSafeAsync = initialState => {
    const [state, unsafeDispatch] = useReducer(asyncReducer, {
        status: "idle",
        data: null,
        error: null,
        ...initialState,
    })

    let dispatch = useSafeDispatch(unsafeDispatch)
    // if you uncomment the line below, this will be an unsafeDispatch
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

`asyncReducer` is a private function that is only available to `useAsync`, and useAsync is `something` we control so we know that it will not be incorrectly used.

```
idle or pending: { data: null, error: null }
rejected: { data: null, error }
resolved: { data, error: null}
```

⚠️❗❗⚠️ WARNING ⚠️❗❗⚠️: Be careful with this, you might want to write an asyncReducer that is more explicit like [how Kent implemented it](https://github.com/kentcdodds/advanced-react-hooks/blob/a449a2119e0b8ea9d90065cc80a00e68a6d4db8b/src/final/02.extra-3.js#L33).

```js
const asyncReducer = (_, nextState) => nextState
```

-   The `useSafeDispatch` takes a regular `unsafeDispatchFunction` and returns a function that guarantees that the dispatch function (which contains the fetch function) will not be called when the component is no longer mounted.
-   The trick is that we have an a reference that that keeps track where a component is mounted or not.
    If it is not mounted then the (safe) dispatch function will not do anything.
-   Bottomline:
    -   `useSafeDispatch` takes an `unsafeDispatchFunction` and returns a `safeDispatchFunction`
    -   The `unsafeDispatchFunction` is unsafe because it will run regardless of whether or not the component is mouted

```js
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

And btw, the component that calls `RickAndMortyInfoCard`
is something like this.

```js
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
    // 2. the input field value has already been resolved or rejected
    // 3. There is no value in the input field
    const submitButtonDisabled =
        disabledByPending ||
        !incompleteValue ||
        (incompleteValue === submittedValue &&
            ["resolved", "rejected"].includes(fetchStatus))

    return (
        <div>
            <PositiveIntegerSearchbar
                value={submittedValue}
                onSubmit={value => setSubmittedValue(value)}
                {...{ incompleteValue, setIncompleteValue }}
                placeholder={"Pick a number!"}
                disableButton={submitButtonDisabled}
                disableInputField={disabledByPending}
            />
            <OnClickButton onClick={setRandomValue} disabled={disabledByPending}>
                <GiPerspectiveDiceSixFacesRandom />
            </OnClickButton>
            <RickAndMortyInfoCard
                characterId={submittedValue}
                {...{ getStatus: setFetchStatus }}
            />
        </div>
    )
}
```
