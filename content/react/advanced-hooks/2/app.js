import { useEffect, useState } from "react"
import { PrettyInputField } from "components/pretty-defaults"
import {
    RickAndMortyInfoCard,
    FETCH_BUTTON_CONTENT,
    RELOAD_BUTTON_CONTENT,
    RandomButton,
    SubmitButton,
    SuccessMessage,
    GenericMessage,
    ErrorMessage,
    NotInCacheMessage,
} from "./components/helper-components"
import RickAndMortyCachePreview from "./components/cache-preview"
import {
    useRickAndMorty,
    RickAndMortyCacheProvider,
} from "./components/use-rick-and-morty"

const NUMBER_OF_RICK_AND_MORTY_CHARACTERS = 672
const randomIntegerBetween = (x, y) => Math.floor(Math.random() * y) + x
const getRandomRickAndMortyCharacterId = () =>
    randomIntegerBetween(1, NUMBER_OF_RICK_AND_MORTY_CHARACTERS)

const RickAndMortySearchbar = ({
    onSubmitHandler,
    setInputField,
    inputFieldValue,
    disabledInputField,
    children,
    bottomMessage,
    ...otherProps
}) => {
    return (
        <>
            <div style={{ display: "flex", alignItems: "center" }} {...otherProps}>
                <form onSubmit={onSubmitHandler} style={{ marginRight: "10px" }}>
                    <PrettyInputField
                        type="number"
                        pattern="^[0-9]"
                        min="1"
                        step="1"
                        placeholder={"pick a number"}
                        value={inputFieldValue}
                        onChange={e => setInputField(e.target.value)}
                        style={{ width: "100%", height: "35px" }}
                        disabled={disabledInputField}
                    />
                </form>
                {children}
            </div>
            {bottomMessage}
        </>
    )
}

const App = () => {
    const [{ inputFieldValue, submitted, submittedValue }, setState] = useState({
        inputFieldValue: "",
        submitted: false,
    })
    const { status, error, data, reload } = useRickAndMorty({
        key: submitted ? submittedValue : inputFieldValue,
        useCacheOnlyWhenNotReloading: submitted ? false : true,
    })

    // Leave this debug statement for now
    useEffect(() => console.log("current InputField Value", inputFieldValue), [
        inputFieldValue,
    ])

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
        bottomMessage = <GenericMessage> This won{"'"}t take long...</GenericMessage>
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
export default Home
