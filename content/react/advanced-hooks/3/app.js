import { BiRefresh } from "react-icons/bi"
import { GiClick } from "react-icons/gi"
import {
    useRickAndMorty,
    RickAndMortyCacheProvider,
} from "./components/use-rick-and-morty"
import { useEffect, useState } from "react"
import { PrettyAnchor, PrettyInputField } from "components/pretty-defaults"
import { TextButton } from "components/button"
import { ErrorView, PendingView, IdleView } from "../1/components/views"
import InfoView from "../1/components/info-view"

const RickAndMortyInfoCard = ({ status, error, data }) => {
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

const REFETCH_BUTTON_TEXT = (
    <>
        <BiRefresh />
        <span style={{ fontSize: "12px" }}> Refetch</span>
    </>
)
const FETCH_BUTTON_TEXT = (
    <>
        <GiClick />
        <span style={{ fontSize: "12px" }}> Fetch</span>
    </>
)

const BUTTON_STYLE = {
    width: "auto",
    height: "30px",
    minWidth: "85px",
    padding: "10px",
    fontSize: "20px",
    borderRadius: "10px",
    display: "flex",
    alignItems: "center",
}
const App = () => {
    const [{ inputFieldId, submitted, submittedId }, setState] = useState({
        inputFieldId: "",
        submitted: false,
    })
    const { status, error, data, reload } = useRickAndMorty({
        key: submitted ? submittedId : inputFieldId,
        useCacheOnlyWhenNotReloading: submitted ? false : true,
    })

    useEffect(() => console.log("currentInputFieldId", inputFieldId), [inputFieldId])
    const setInputFieldId = id => setState({ submitted: false, inputFieldId: id })

    const onClickReload = e => {
        e.preventDefault()
        setState({ submitted: true, submittedId: inputFieldId, inputFieldId })
        reload()
    }

    const onClickFetch = e => {
        e.preventDefault()
        setState({ submitted: true, submittedId: inputFieldId, inputFieldId })
    }

    let disableButtons = status === "pending" || !inputFieldId
    let isReloadSubmitType = ["rejected", "resolved"].includes(status) ? true : false
    const onSubmitHandler = isReloadSubmitType ? onClickReload : onClickFetch

    let button = (
        <TextButton
            useBgPrimaryColor={true}
            isInvertedColor={true}
            onClick={onSubmitHandler}
            disabled={disableButtons}
            style={BUTTON_STYLE}
        >
            {isReloadSubmitType ? REFETCH_BUTTON_TEXT : FETCH_BUTTON_TEXT}
        </TextButton>
    )

    let notInCacheMessage = (
        <span style={{ fontSize: "14px", margin: "5px" }}>
            The id {`"`}
            {inputFieldId}
            {`"`} is not in your cache yet.
            <PrettyAnchor onClick={onClickFetch}> Fetch it?</PrettyAnchor>
        </span>
    )

    let maybeMessage =
        inputFieldId && status !== "pending" && !data ? notInCacheMessage : null

    return (
        <div>
            <div style={{ display: "flex", alignItems: "center" }}>
                <form onSubmit={onSubmitHandler}>
                    <PrettyInputField
                        type="number"
                        pattern="^[0-9]"
                        min="1"
                        step="1"
                        placeholder={"pick a number"}
                        value={inputFieldId}
                        onChange={e => setInputFieldId(e.target.value)}
                        style={{ width: "100%", height: "35px" }}
                        disabled={status === "pending"}
                    />
                </form>
                {button}
            </div>
            {maybeMessage}
            <RickAndMortyInfoCard {...{ status, error, data }} />
        </div>
    )
}

const Home = () => (
    <RickAndMortyCacheProvider>
        <App />
    </RickAndMortyCacheProvider>
)
export default Home
