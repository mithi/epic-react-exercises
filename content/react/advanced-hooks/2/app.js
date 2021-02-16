import { useEffect, useState } from "react"
import { GiPerspectiveDiceSixFacesRandom } from "components/icons"
import { SquareButton } from "components/button"
import {
    RickAndMortyInfoCard,
    FETCH_BUTTON_CONTENT,
    RELOAD_BUTTON_CONTENT,
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
import {
    PositiveIntegerInputField,
    SingleFieldForm,
    SubmitButton,
} from "components/single-field-form"

const NUMBER_OF_RICK_AND_MORTY_CHARACTERS = 672
const randomIntegerBetween = (x, y) => Math.floor(Math.random() * y) + x
const getRandomRickAndMortyCharacterId = () =>
    randomIntegerBetween(1, NUMBER_OF_RICK_AND_MORTY_CHARACTERS)

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

    const onClickReload = () => {
        setState({ submitted: true, submittedValue: inputFieldValue, inputFieldValue })
        reload()
    }

    const onClickFetch = () => {
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
            <SingleFieldForm
                onSubmit={onSubmitHandler}
                setIncompleteValue={setInputField}
                incompleteValue={inputFieldValue}
            >
                <PositiveIntegerInputField
                    disabled={isPending}
                    placeholder="pick a number"
                />
                <SubmitButton disabled={isPending || !inputFieldValue}>
                    {submitButtonText}
                </SubmitButton>
                <SquareButton
                    aria-label="fetch a random rick and morty character"
                    onClick={setRandomValue}
                    disabled={isPending}
                >
                    <GiPerspectiveDiceSixFacesRandom />
                </SquareButton>
            </SingleFieldForm>
            {bottomMessage}
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
