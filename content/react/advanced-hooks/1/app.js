import { useEffect, useState } from "react"
import useSafeAsync from "./components/use-async"
import delayedFetchRickAndMortyCharacterById from "./components/fetch-rick-and-morty"
import PositiveIntegerSearchbar from "./components/positive-integer-search-bar"

/*
This`RickAndMortyInfoCard` is written roughly as in the code block below this paragraph (with modifications
of the a prettier return value).

It uses a `useSafeAsync` hook that's responsible for managing the state,
and fetching the data.

The hook makes sure that the dispatch function (that returns the the data and state from
the fetch function) would not be run if the component is no longer mounted.

In other words, if the `RickAndMortyInfoCard` is no longer mounted,
its state will no longer be updated (since it doesn't exist anymore)

The `runFunction` provided by `useSafeAsync` is the function that we should run whenever we want
to fetch the data. The `runFunction` takes in a promise and updates the state `{data, status error}`.

In our case, the promise that we feed to the `runFunction` is the return value of the `fetchFunction`
we call whenever we need to fetch something.
 */
function RickAndMortyInfoCard({ characterId }) {
    const { data, status, error, runFunction } = useSafeAsync({
        status: characterId ? "pending" : "idle",
    })

    useEffect(() => {
        if (!characterId) {
            return
        }
        runFunction(delayedFetchRickAndMortyCharacterById(characterId))
    }, [characterId, runFunction])

    if (status === "idle") {
        return "submit a character"
    } else if (status === "pending") {
        return "loading"
    } else if (status === "rejected") {
        return `error: ${error.message}`
    } else if (status === "resolved") {
        return `data: ${JSON.stringify(data)}`
    }

    throw new Error("This should be impossible")
}

function App() {
    const [submittedValue, setSubmittedValue] = useState("")
    const [incompleteValue, setIncompleteValue] = useState("")

    return (
        <>
            <PositiveIntegerSearchbar
                value={submittedValue}
                onSubmit={value => setSubmittedValue(value)}
                {...{ incompleteValue, setIncompleteValue }}
                placeholder={"Rick and Morty character id)..."}
            />
            <RickAndMortyInfoCard characterId={submittedValue} />
        </>
    )
}

function AppWithUnmountCheckbox() {
    const [mountApp, setMountApp] = useState(true)
    return (
        <div>
            <label>
                <input
                    type="checkbox"
                    checked={mountApp}
                    onChange={e => setMountApp(e.target.checked)}
                />
                Mount Component
            </label>
            <hr />
            {mountApp ? <App /> : null}
        </div>
    )
}

export default AppWithUnmountCheckbox
