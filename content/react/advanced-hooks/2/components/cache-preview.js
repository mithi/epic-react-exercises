import { PrettyAnchor } from "components/pretty-defaults"
import { DefaultButton } from "components/button"

import { useRickAndMortyCache } from "./use-rick-and-morty"

const CacheButton = ({ imageUrl, onClick, active }) => (
    <DefaultButton
        disabled={active}
        style={{ width: "35px", height: "35px", margin: "2px", borderRadius: "5px" }}
        onClick={onClick}
    >
        <img
            src={imageUrl}
            height="30px"
            width="30px"
            style={{
                borderRadius: "5px",
                margin: "5px",
            }}
        />
    </DefaultButton>
)

const CacheAction = ({ onClick, children }) => (
    <>
        <PrettyAnchor style={{ fontSize: "12px" }} onClick={onClick}>
            {children}
        </PrettyAnchor>
        <br />
    </>
)

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
            <div style={{ display: "flex", flexWrap: "wrap" }}>{buttons}</div>
        </>
    )
}

export default RickAndMortyCachePreview
