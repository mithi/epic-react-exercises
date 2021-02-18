import { OnClickText, SmallSpan, RoundedImage } from "components/pretty-defaults"
import { SquareButton } from "components/button"
import { useRickAndMortyCache } from "./use-rick-and-morty"

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
        <SquareButton
            key={cache[i].name}
            disabled={i === id}
            onClick={() => setId(i)}
            aria-label={`load ${cache[i].name}`}
            style={{ margin: "1px" }}
        >
            <RoundedImage src={cache[i].imageUrl} height={30} width={30} />
        </SquareButton>
    ))

    let removeAction = null
    if (id && cache[id]) {
        removeAction = (
            <OnClickText onClick={removeId}>
                <SmallSpan>{`Remove "${cache[id].name}" (#${id}) from cache?`}</SmallSpan>
            </OnClickText>
        )
    }

    let clearAction = null
    if (cacheKeys.length !== 0) {
        clearAction = (
            <OnClickText onClick={clearCache}>
                <SmallSpan>Clear cache?</SmallSpan>
            </OnClickText>
        )
    }

    return (
        <>
            {removeAction}
            <br />
            {clearAction}
            <br />
            <div style={{ display: "flex", flexWrap: "wrap" }}>{buttons}</div>
        </>
    )
}

export default RickAndMortyCachePreview
