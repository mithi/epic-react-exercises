## A simple fetch-and-cache pattern

> Summary: Create a system for storing and accessing previously fetched data that avoids redundant network calls and gives a better user experience. The components must be written in an elegant way such that we'll have both great end-user and developer experience. Scope context values correctly for improved performance and maintainability.

-   The user should be able to fetch Rick and Morty characters and store them locally in some sort of cache. If the character was fetched before, it should be loaded instantly, do NOT make a network request.
-   While the user types in the input field, the app should be getting data from the cache on each change. When the input field contains an id that is on the cache, instantaneously display the cached data on the screen.
-   If the data is not on the cache, the app should wait for the user to submit (by hitting `enter` or click the `fetch` button) before sending an http request.
-   Allow the user to `refetch` data that is already on the cache by hitting a `refetch` button. Hitting it should update the cache with the newly fetched data.
-   When there is an error upon `fetching`, allow the user to try to refetch again.
-   For each data on the cache, display buttons that users can click to load that data on the screen
-   Allow the user to remove data from the cache or clear the cache entirely
-   Disable the buttons and search bar and when the network request is not yet complete
-   The submit button should be disabled when there is no data on the input field
-   Navigating away from the page, going back, refreshing the page, unmounting or remounting the component should NOT clear the cache
-   As usual, allows the user to randomly get fetch random character with a dedicated button

### My Solution

> Note: This solution doesn't use a library, but it's best practice that you do. Use a library like [Tanner Linsley's React Query](https://github.com/tannerlinsley/react-query) to help do this instead of implementing everything on your own from scratch.

The top level App

```jsx
const App = () => {
    const [{ submitted, inputFieldValue, submittedValue }, setState] = useState({
        submitted: false,
        inputFieldValue: "",
        submittedValue: "",
    })

    const { status, error, data, reload } = useRickAndMorty({
        key: submitted ? submittedValue : inputFieldValue,
        useCacheOnlyWhenNotReloading: submitted ? false : true,
    })

    const setInputField = value =>
        setState({ submitted: false, inputFieldValue: value, submittedValue })

    const onClickReload = () => {
        setState({ submitted: true, inputFieldValue, submittedValue: inputFieldValue })
        reload()
    }

    const onClickFetch = () => {
        setState({ submitted: true, inputFieldValue, submittedValue: inputFieldValue })
    }

    const setRandomValue = () => {
        const id = getRandomRickAndMortyCharacterId()
        setState({ submitted: true, inputFieldValue: id, submittedValue: id })
    }

    let bottomMessage = null
    if (status === "notInCache") {
        // prettier-ignore
        bottomMessage = <NotInCacheMessage {...{ onClickFetch, value: inputFieldValue }} />
    } else if (status === "rejected") {
        bottomMessage = <ErrorMessage {...{ onClickReload, value: submittedValue }} />
    } else if (status === "resolved") {
        bottomMessage = ` The character ${data.name}! (#${data.id}) is in your cache! 🎉🥳`
    } else if (status === "idle") {
        bottomMessage = "Which Rick and Morty Character?"
    } else if (status === "pending") {
        bottomMessage = "This won't take long..."
    }

    let isReloadSubmitType = ["rejected", "resolved"].includes(status) ? true : false
    const onSubmitHandler = isReloadSubmitType ? onClickReload : onClickFetch
    const submitButtonText = isReloadSubmitType
        ? RELOAD_BUTTON_CONTENT
        : FETCH_BUTTON_CONTENT
    const isPending = status === "pending"

    return (
        <>
            <SingleFieldForm
                onSubmit={onSubmitHandler}
                setValue={setInputField}
                value={inputFieldValue}
            >
                <PositiveIntegerInputField disabled={isPending} />
                <FormSubmit disabled={isPending || !inputFieldValue}>
                    {submitButtonText}
                </FormSubmit>
                <button onClick={setRandomValue} disabled={isPending}>
                    Get Random Character
                </button>
                <span>{bottomMessage}</span>
            </SingleFieldForm>
            <RickAndMortyInfoCard {...{ status, error, data }} />
            <RickAndMortyCachePreview setId={setInputField} id={inputFieldValue} />
        </>
    )
}

const Home = () => (
    <RickAndMortyCacheProvider>
        <App />
    </RickAndMortyCacheProvider>
)
```

CachePreview

```jsx
const RickAndMortyCachePreview = ({ setId, id }) => {
    const { cache, dispatch } = useRickAndMortyCache()

    const clearCache = () => {
        setId("")
        dispatch({ type: "CLEAR" })
    }

    const removeId = () => {
        setId("")
        dispatch({ type: "REMOVE", key: id })
    }

    const cacheKeys = Object.keys(cache)
    const buttons = cacheKeys.map(i => (
        <button
            key={cache[i].name}
            imageUrl={cache[i].imageUrl}
            onClick={() => setId(i)}
            active={i === id}
        />
    ))

    let removeAction = null
    if (id && cache[id]) {
        const removeText = `Remove "${cache[id].name}" (#${id}) from cache?`
        removeAction = <button onClick={removeId}>{removeText}</button>
    }

    let clearAction = null
    if (cacheKeys.length !== 0) {
        clearAction = <button onClick={clearCache}>Clear cache?</button>
    }

    return (
        <>
            {removeAction}
            {clearAction}
            {buttons}
        </>
    )
}
```

useRickAndMortyCache

```jsx
const RickAndMortyCacheContext = createContext()

function RickAndMortyCacheProvider({ children }) {
    const { cache, dispatch } = useCache("rick-and-morty-cache")
    return (
        <RickAndMortyCacheContext.Provider
            value={{ cache, dispatch }}
            {...{ children }}
        />
    )
}

function useRickAndMortyCache() {
    const context = useContext(RickAndMortyCacheContext)
    if (!context) {
        throw new Error(
            "useRickAndMortyCache must be used within a RickAndMortyCacheProvider"
        )
    }
    return context
}
```

useRickAndMorty

```jsx
function useRickAndMorty({ key = "", useCacheOnlyWhenNotReloading = false } = {}) {
    const { cache, dispatch: cacheDispatch } = useRickAndMortyCache()

    const {
        data: asyncData,
        status: asyncStatus,
        error: asyncError,
        runFunction,
        reset,
    } = useAsync()

    useEffect(() => {
        reset()
        if (!key) {
            return
        }

        if (!cache[key] && !useCacheOnlyWhenNotReloading) {
            load()
        }
    }, [key, load, cache, useCacheOnlyWhenNotReloading, reset])

    const load = useCallback(() => {
        runFunction(
            delayedFetchRickAndMorty(key).then(data => {
                cacheDispatch({ type: "OVERRIDE", key, data })
                return data
            })
        )
    }, [key, cacheDispatch, runFunction])

    const reload = useCallback(() => {
        cacheDispatch({ type: "REMOVE", key })
        load()
    }, [load, key, cacheDispatch])

    if (!key) {
        return { status: "idle", data: null }
    }

    if (cache[key]) {
        return { data: cache[key], status: "resolved", reload }
    }

    if (useCacheOnlyWhenNotReloading && !cache[key]) {
        return { status: "notInCache" }
    }

    return { status: asyncStatus, data: asyncData, error: asyncError, reload }
}
```

useCache

```jsx
const cacheReducer = (cache, action) => {
    const { type, key, data } = action

    if (type === "CLEAR") {
        return {}
    }

    if (type === "OVERRIDE") {
        if (!data || !key) {
            return cache
        }
        return { ...cache, [key]: data }
    }

    if (type === "REMOVE") {
        if (!cache[key]) {
            return cache
        }
        const newCache = { ...cache }
        delete newCache[key]
        return newCache
    }
    throw new Error(`unhandled action type: ${type} in useCache`)
}

const useCache = localStorageKey => {
    const [localData, setLocalData] = useLocalStorageState(localStorageKey)
    const [cache, dispatch] = useReducer(cacheReducer, localData)
    useEffect(() => setLocalData(cache), [cache, setLocalData])
    return { cache, dispatch }
}
```

### Notes

> A common mistake of context (and generally any “application” state) is to make it globally available anywhere in your application when it’s actually only needed to be available in a part of the app (like a single page). Keeping a context value scoped to the area that needs it most has improved performance and maintainability characteristics.
