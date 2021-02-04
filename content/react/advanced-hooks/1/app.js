import { useEffect, useState } from "react"
import { GiPerspectiveDiceSixFacesRandom, GiClick } from "react-icons/gi"
import { delayedFetchRickAndMorty } from "fetch-utils"
import { DefaultButton } from "components/button"
import { BorderedDiv, PositiveIntegerSearchbar } from "components/pretty-defaults"
import { ErrorView, PendingView, IdleView } from "./components/views"
import InfoView from "./components/info-view"
import useSafeAsync from "./components/use-async"

/*
This`RickAndMortyInfoCard` uses a `useSafeAsync` hook that's responsible for managing the state,
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
        runFunction(delayedFetchRickAndMorty(characterId))
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

const NUMBER_OF_RICK_AND_MORTY_CHARACTERS = 672
const randomIntegerBetween = (x, y) => Math.floor(Math.random() * y) + x
const getRandomRickAndMortyCharacterId = () =>
    randomIntegerBetween(1, NUMBER_OF_RICK_AND_MORTY_CHARACTERS)

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
        <div style={{ margin: "20px" }}>
            <p style={{ fontSize: "12px" }}>
                ❗ Only positive integers from 1 to{" "}
                {NUMBER_OF_RICK_AND_MORTY_CHARACTERS - 1} correspond to a Rick and Morty
                character.
            </p>

            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-start",
                }}
            >
                <PositiveIntegerSearchbar
                    value={submittedValue}
                    onSubmit={value => setSubmittedValue(value)}
                    {...{ incompleteValue, setIncompleteValue }}
                    placeholder={"Pick a number!"}
                    disableButton={submitButtonDisabled}
                    disableInputField={disabledByPending}
                    submitButtonStyle={{
                        height: "35px",
                        width: "auto",
                        borderRadius: "10px",
                        margin: "0px",
                        padding: "10px 10px",
                        fontSize: "12px",
                    }}
                    inputFieldStyle={{ height: "35px", width: "140px", margin: "5px" }}
                    submitButtonContent={
                        <>
                            <GiClick />
                            Submit
                        </>
                    }
                />
                <DefaultButton
                    onClick={setRandomValue}
                    style={{ height: "35px", width: "35px", marginLeft: "5px" }}
                    disabled={disabledByPending}
                    aria-label="random-button"
                >
                    <GiPerspectiveDiceSixFacesRandom />
                </DefaultButton>
            </div>

            <RickAndMortyInfoCard
                characterId={submittedValue}
                getStatus={setFetchStatus}
            />
        </div>
    )
}

function AppWithUnmountCheckbox() {
    const [mountApp, setMountApp] = useState(true)

    return (
        <div>
            <BorderedDiv
                style={{
                    margin: "10px",
                    padding: "10px",
                    borderStyle: "dashed",
                }}
            >
                <label>
                    <input
                        type="checkbox"
                        checked={mountApp}
                        onChange={e => setMountApp(e.target.checked)}
                    />
                    <span style={{ fontSize: "15px" }}> Mount the search bar</span>
                </label>
            </BorderedDiv>
            {mountApp ? <App /> : null}
        </div>
    )
}

export default AppWithUnmountCheckbox
