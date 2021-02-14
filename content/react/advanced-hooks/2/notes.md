## The Simple Caching Exercise

-   In this exercise, the user should be able to fetch Rick and Morty characters and store them locally in some sort of cache. If the character was fetched before, it should be loaded instantly without making a network request.
-   While the user types in the input field, the app should be getting data from the cache on each change. When the input field contains an id that is on the cache, instantaneously display the cached data on the screen.
-   If the data is not on the cache, your app should wait for the user to submit (by hitting `enter` or click the `fetch` button) before sending an http request.
-   Allow the user to `refetch` data that is already on the cache by hitting a `refetch` button. Hitting it should update the cache with the newly fetched data.
-   When there is an error upon `fetching`, allow the user to try to refetch again.
-   For each data on the cache, display buttons that users can click to load that data on the screen
-   Allow the user to remove data from the cache or clear the cache entirely
-   Disable the buttons and search bar and when the network request is not yet complete
-   The submit button should be disabled when there is no data on the input field
-   Navigating away from the page and going back, refreshing the page, and unmounting remounting the component should NOT clear the cache
-   As usual, allows the user to randomly get fetch random character by clicking a specific button

### My Implementation

The top level App

```jsx
const App = () => {
    const [{ inputFieldValue, submitted, submittedValue }, setState] = useState({
        inputFieldValue: "",
        submitted: false,
    })
    const { status, error, data, reload } = useRickAndMorty({
        key: submitted ? submittedValue : inputFieldValue,
        useCacheOnlyWhenNotReloading: submitted ? false : true,
    })

    const setInputField = value =>
        setState({ submitted: false, inputFieldValue: value, submittedValue })

    const onClickReload = e => {
        e.preventDefault()
        setState({ submitted: true, submittedValue: inputFieldValue, inputFieldValue })
        reload()
    }

    const onClickFetch = e => {
        e.preventDefault()
        setState({ submitted: true, submittedValue: inputFieldValue, inputFieldValue })
    }
    const setRandomValue = () => {
        const id = getRandomRickAndMortyCharacterId()
        setState({ submitted: true, submittedValue: id, inputFieldValue: id })
    }

    let bottomMessage = null
    if (status === "notInCache") {
        // prettier-ignore
        bottomMessage = <NotInCacheMessage {...{ onClickFetch, value: inputFieldValue }} />
    } else if (status === "rejected") {
        bottomMessage = <ErrorMessage {...{ onClickReload, value: submittedValue }} />
    } else if (status === "resolved") {
        bottomMessage = <SuccessMessage {...{ data }} />
    } else if (status === "idle") {
        bottomMessage = <GenericMessage>Which Rick and Morty Character?</GenericMessage>
    } else if (status === "pending") {
        bottomMessage = <GenericMessage> This will not take long...</GenericMessage>
    }

    let isReloadSubmitType = ["rejected", "resolved"].includes(status) ? true : false
    const onSubmitHandler = isReloadSubmitType ? onClickReload : onClickFetch
    const submitButtonText = isReloadSubmitType
        ? RELOAD_BUTTON_CONTENT
        : FETCH_BUTTON_CONTENT
    const isPending = status === "pending"

    return (
        <div>
            <RickAndMortySearchbar
                {...{
                    onSubmitHandler,
                    setInputField,
                    inputFieldValue,
                    disabledInputField: isPending,
                    bottomMessage,
                }}
            >
                <SubmitButton
                    onClick={onSubmitHandler}
                    disabled={isPending || !inputFieldValue}
                >
                    {submitButtonText}
                </SubmitButton>
                <RandomButton onClick={setRandomValue} disabled={isPending} />
            </RickAndMortySearchbar>
            <RickAndMortyInfoCard {...{ status, error, data }} />
            <RickAndMortyCachePreview
                {...{ setId: setInputField, id: inputFieldValue }}
            />
        </div>
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
        <CacheButton
            key={cache[i].name}
            imageUrl={cache[i].imageUrl}
            onClick={() => setId(i)}
            active={i === id}
        />
    ))

    let removeAction = null
    if (id && cache[id]) {
        const removeText = `Remove "${cache[id].name}" (#${id}) from cache?`
        removeAction = <CacheAction onClick={removeId}>{removeText}</CacheAction>
    }

    let clearAction = null
    if (cacheKeys.length !== 0) {
        clearAction = <CacheAction onClick={clearCache}>Clear cache?</CacheAction>
    }

    return (
        <>
            {removeAction}
            {clearAction}
            <div>{buttons}</div>
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
