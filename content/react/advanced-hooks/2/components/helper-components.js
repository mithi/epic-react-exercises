import { BiRefresh, GiPerspectiveDiceSixFacesRandom, FaSearch } from "components/icons"
import { OnClickText, SmallSpan } from "components/pretty-defaults"
import { SquareButton, ColoredButton } from "components/button"
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
        <SmallSpan> Refetch</SmallSpan>
    </>
)
const FETCH_BUTTON_CONTENT = (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <FaSearch />
        <SmallSpan style={{ paddingLeft: "5px" }}>Fetch</SmallSpan>
    </div>
)

const RandomButton = ({ onClick, disabled }) => (
    <SquareButton
        aria-label="fetch a random rick and morty character"
        {...{ onClick, disabled }}
    >
        <GiPerspectiveDiceSixFacesRandom />
    </SquareButton>
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
    <SmallSpan style={{ margin: "10px" }}>{children}</SmallSpan>
)

let SuccessMessage = ({ data }) => (
    <GenericMessage>
        The character {data.name}! (#{data.id}) is in your cache! {"🎉🥳"}
    </GenericMessage>
)

const SubmitButton = ({ onClick, disabled, children }) => (
    <ColoredButton {...{ onClick, disabled }}>{children}</ColoredButton>
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
