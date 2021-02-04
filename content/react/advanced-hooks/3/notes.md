## Simple Caching Exercise

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

## My Implementation

-   My Implementation: [Top level component](https://github.com/mithi/epic-notes/blob/main/content/react/advanced-hooks/2/app.js) + other [components](https://github.com/mithi/epic-notes/tree/main/content/react/advanced-hooks/2/components)
-   Create a `useCache` hook, that takes in a key (that will be used for storing data in the local storage using the `useLocalStorageState` hook) and returns the a `cache` object and a `dispatch` function. The `dispatch` function should be able to `CLEAR` the cache, add or `OVERRIDE` data in the cache, and `REMOVE` data from the `cache`
-   Using `useCache`, create a `RickAndMortyCacheContext`, `RickAndMortyCacheProvider`, and a `useRickAndMortyCache` cache, to store all the fetched Rick and Morty Characters.
-   On the old `useAsync` hook implementation add the option `reset` that when triggered will set the `useAsync` hook status to `idle`
-   Create a `useRickAndMorty` hook which takes in an object `{key = "", useCacheOnlyWhenNotReloading = false}` and returns `{ status, error, data, reload }`. If `key` is in the `cache`, return this data with a status of `resolved`. If `key` is not the `cache` and `useCacheOnlyWhenNotReloading` is `true` then return `{status: "notInCache", reload}`, If `key` is not in the `cache` and `useCacheOnlyWhenNotReloading` is `false` then fetch this data using the `useAsync` hook. `reload` is a function that is when called, will refetch the data using `useAsync` and override the current data in the cache.
-   Create a `CachePreview` component to manipulate the cache. It accepts a prop of `id` and `setId` so that it knows what `id` is currently selected, and also to be able set the `id` of the parent via `setID`

### The App Component

```js
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

### CachePreview

```js
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

### useCache

```js
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

### useRickAndMortyCache

```js
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

### useRickAndMorty

```js
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

## How to test

1.  Start with nothing in the cache
2.  When the input field has `""`:

    -   no character should be displayed.
    -   The `fetch` (with a `magnifying glass icon`) submit button should be disabled.
    -   The random button should NOT be disabled.

3.  Input `"1"`

    -   under the searchbar you'd see `The id "1" is not in your cache yet. Fetch it?`.
    -   hitting enter or clicking the "fetch" button or the `fetch it` text should trigger the loading screen.
    -   The random button and the submit button should be disabled at this point.

4.  After successfully loading the data

    -   There should be a small message under the searchbar: `"Successfully fetched Rick Sanchez! (#1)"` along with the profile data.
    -   The options `Remove "Rick Sanchez" (#1) from cache?` and `clear cache?` should also appear and should be clickable
    -   The `fetch` submit button should now be a `refetch` button with a `refresh icon`.
    -   By this point there should be a tiny disabled button at the button representing that data on the cache.

5.  Do the same for "11" and "111".

    -   At this point the character with "111" which is Eli's Girlfriend should be loaded in your screen.
    -   There should be three characters at your cache right now. Rick, Albert Einstein, and Eli's Girlfriend.

6.  Three button should now be visible...

    -   which should corresponding to each character.
    -   Clicking each button will display the profile of each character.
    -   Clicking the buttons should also change the value in the input field, and the button of the active character should also look different from the rest (and `disabled`)

7.  Refreshing this page

    -   That should remove the currently active character but the three buttons and the `Clear cache?` message should still exist.

8.  Type `""` in the input field

    -   `"Remove ___ from cache?"` should disapear and all buttons should be active once again. `Clear cache?` option should still be visible

9.  Then type `"1"` four times until the input field displays `"1111"`.
    -   It should display the data for "Rick" then "Albert Einstein" then "Eli's girlfriend", and finally the screen should display the message: `"The id "1111" is not in your cache yet. Fetch it?"`.
10. Submit `"1111"` by pressing enter or clicking the `fetch button` or `fetch it?` text.

    -   After loading, this should produce and error `"404 Not Found"`, and the message `"There was an error while fetching the id "1111 ". Try fetching it again?"` should be displayed.
    -   Clicking the `"refetch"` button or the `"fetching it? again"` text or pressing enter should try to fetch this character again.

11. Type `"1"` again

    -   The message `Remove "Rick Sanchez" (#1) from cache?` should appear.
    -   Clicking it would remove him not only in the buttons and as loaded profile. The "Remove from cache` option should also disapear.

12. Click `Clear Cache?`

    -   It would remove all three data points and thus the three buttons in the cache.
    -   The `Clear Cache?` message should also disappear.

13. Refresh the page
    -   You should be able to reproduce the steps over and over again without encountering any problem.
