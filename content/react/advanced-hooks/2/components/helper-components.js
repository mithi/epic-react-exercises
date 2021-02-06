import { BiRefresh } from "react-icons/bi"
import { GiPerspectiveDiceSixFacesRandom } from "react-icons/gi"
import { FaSearch } from "react-icons/fa"
import { OnClickText } from "components/pretty-defaults"
import { OnClickButton, DefaultButton } from "components/button"
import { PendingView } from "../../1/components/views"
import InfoView, { IdleView, ErrorView } from "./info-view"

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
        <span style={{ fontSize: "12px" }}> Refetch</span>
    </>
)
const FETCH_BUTTON_CONTENT = (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <FaSearch />
        <span style={{ fontSize: "12px", paddingLeft: "5px" }}>Fetch</span>
    </div>
)

const RandomButton = ({ onClick, disabled }) => (
    <OnClickButton
        style={{ height: "35px", width: "35px", margin: "0px" }}
        aria-label="fetch a random rick and morty character"
        {...{ onClick, disabled }}
    >
        <GiPerspectiveDiceSixFacesRandom />
    </OnClickButton>
)

let NotInCacheMessage = ({ value, onClickFetch }) => (
    <GenericMessage>
        The id {`"`}
        {value}
        {`"`} is not in your cache yet.{" "}
        <OnClickText onClick={onClickFetch}>Fetch it?</OnClickText>
    </GenericMessage>
)

let ErrorMessage = ({ value, onClickReload }) => (
    <GenericMessage>
        {"❗❗"} There was an error while fetching the id {`"${value}". `}
        <OnClickText onClick={onClickReload}>Try fetching it again?</OnClickText>
    </GenericMessage>
)

let GenericMessage = ({ children }) => (
    <span style={{ fontSize: "14px", margin: "5px" }}>{children}</span>
)

let SuccessMessage = ({ data }) => (
    <GenericMessage>
        The character {data.name}! (#{data.id}) is in your cache! {"🎉🥳"}
    </GenericMessage>
)

const SubmitButton = ({ onClick, disabled, children }) => (
    <DefaultButton {...{ onClick, disabled }} style={{ height: "35px" }}>
        {children}
    </DefaultButton>
)

export {
    RickAndMortyInfoCard,
    FETCH_BUTTON_CONTENT,
    RELOAD_BUTTON_CONTENT,
    RandomButton,
    SubmitButton,
    SuccessMessage,
    GenericMessage,
    ErrorMessage,
    NotInCacheMessage,
}
