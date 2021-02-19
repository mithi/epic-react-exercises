import { useState } from "react"
import { GiPerspectiveDiceSixFacesRandom } from "components/icons"
import { SquareButton } from "components/button"
import {
    PositiveIntegerInputField,
    SingleFieldForm,
    FormSubmit,
    FormSameLine,
    FormBottom,
} from "components/single-field-form"
import { BiRefresh, FaSearch } from "components/icons"
import { OnClickText, SmallSpan } from "components/pretty-defaults"
import { IdleView, PendingView, ErrorView, InfoView } from "../1/components/views"
import RickAndMortyCachePreview from "./components/cache-preview"
import {
    useRickAndMorty,
    RickAndMortyCacheProvider,
} from "./components/use-rick-and-morty"

const RickAndMortyInfoCard = ({ status, error, data }) => {
    if (status === "idle" || status === "notInCache") {
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

const RELOAD_BUTTON_CONTENT = (
    <>
        <BiRefresh />
        <SmallSpan> Refetch</SmallSpan>
    </>
)

const FETCH_BUTTON_CONTENT = (
    <>
        <FaSearch />
        <span style={{ paddingLeft: "5px" }}>Fetch</span>
    </>
)

let NotInCacheMessage = ({ value, onClickFetch }) => (
    <>
        The id {`"${value}" is not in your cache yet. `}
        <OnClickText onClick={onClickFetch}>Fetch it?</OnClickText>
    </>
)

let ErrorMessage = ({ value, onClickReload }) => (
    <>
        {`❗❗ There was an error while fetching the id "${value}". `}
        <OnClickText onClick={onClickReload}>Try fetching it again?</OnClickText>
    </>
)

const NUMBER_OF_RICK_AND_MORTY_CHARACTERS = 672
const randomIntegerBetween = (x, y) => Math.floor(Math.random() * y) + x
const getRandomRickAndMortyCharacterId = () =>
    randomIntegerBetween(1, NUMBER_OF_RICK_AND_MORTY_CHARACTERS)

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
                <FormSameLine>
                    <SquareButton
                        aria-label="Fetch a random rick and morty character"
                        onClick={setRandomValue}
                        disabled={isPending}
                    >
                        <GiPerspectiveDiceSixFacesRandom />
                    </SquareButton>
                </FormSameLine>
                <FormBottom>
                    <SmallSpan>{bottomMessage}</SmallSpan>
                </FormBottom>
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

export default Home
