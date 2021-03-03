import { useState } from "react"
import { SmallSpan, PrettyHeader } from "components/pretty-defaults"
import { Rating, actionTypes } from "./components/rating"
import {
    darkOrangeStar,
    orangeStar,
    greyStar,
    orangeStarBigger,
    defaultHeart,
    activeHeart,
    hoverHeart,
    filledHeart,
} from "./components/icons"

const NUMBER_OF_STARS = 5
const HEART_MULTIPLIER = 2
const NUMBER_OF_HEARTS = NUMBER_OF_STARS * HEART_MULTIPLIER
const NAME = { heart: "heart", star: "star" }
const RATING_STYLE = {
    height: "60px",
    marginTop: "5px",
    display: "flex",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
}

const getSyncInfoFromHeart = (suggestedState, action, previousRating) => {
    const newRating = suggestedState.rating
    const isEven = newRating % 2 === 0
    const evenRating = isEven ? newRating : newRating + 1
    action = { component: NAME.heart, ...action }

    if (action.type === actionTypes.rate) {
        if (!isEven && previousRating === evenRating) {
            return {
                state: {
                    rating: 0,
                    lastEvent: actionTypes.removeRating,
                    hoverIndex: null,
                },
                action,
            }
        } else {
            return {
                state: { ...suggestedState, rating: evenRating },
                action,
            }
        }
    }

    if (action.type === actionTypes.hover) {
        const newHoverIndex = suggestedState.hoverIndex
        const evenHoverIndex =
            newHoverIndex === null
                ? null
                : newHoverIndex % 2 === 0
                ? newHoverIndex + 1
                : newHoverIndex

        return {
            state: { ...suggestedState, rating: evenRating, hoverIndex: evenHoverIndex },
            action,
        }
    }

    throw new Error(`Unsupported actionType: ${action.type}`)
}

const getSyncInfoFromStar = (suggestedState, action) => {
    const hoverIndex =
        suggestedState.hoverIndex === null
            ? null
            : suggestedState.hoverIndex * HEART_MULTIPLIER + 1

    return {
        state: {
            ...suggestedState,
            rating: suggestedState.rating * HEART_MULTIPLIER,
            hoverIndex,
        },
        action: { component: NAME.star, ...action },
    }
}

const getStarStateFromHeart = heartState => {
    return {
        ...heartState,
        rating: Math.floor(heartState.rating / HEART_MULTIPLIER),
        hoverIndex:
            heartState.hoverIndex !== null
                ? Math.floor(heartState.hoverIndex / HEART_MULTIPLIER)
                : null,
    }
}

const App = () => {
    const [syncInfo, setSyncInfo] = useState({
        action: { component: NAME.heart, type: null, hoverIndex: null, rating: 0 },
        state: { rating: 0, hoverIndex: null, lastEvent: actionTypes.mouseLeave },
    })

    function handleStarRatingChange(suggestedState, action) {
        const next = getSyncInfoFromStar(suggestedState, action)
        setSyncInfo(next)
    }

    function handleHeartRatingChange(suggestedState, action) {
        const next = getSyncInfoFromHeart(suggestedState, action, syncInfo.state.rating)
        setSyncInfo(next)
    }

    const starState = getStarStateFromHeart(syncInfo.state)

    return (
        <div>
            <PrettyHeader style={{ textAlign: "center", margin: "5px" }}>
                CONTROLLED
            </PrettyHeader>
            <SmallSpan>
                STATE (heart): {JSON.stringify(syncInfo.state, null, 2)}
            </SmallSpan>
            <br />
            <SmallSpan>LAST ACTION: {JSON.stringify(syncInfo.action, null, 2)}</SmallSpan>
            <Rating
                style={{ ...RATING_STYLE, height: "40px", marginTop: "10px" }}
                iconFilled={filledHeart}
                iconDefault={defaultHeart}
                iconHover={hoverHeart}
                iconActive={activeHeart}
                maxRating={NUMBER_OF_HEARTS}
                onChange={handleHeartRatingChange}
                state={syncInfo.state}
                name={NAME.heart}
            />
            <Rating
                style={RATING_STYLE}
                iconFilled={darkOrangeStar}
                iconDefault={greyStar}
                iconHover={orangeStar}
                iconActive={orangeStarBigger}
                maxRating={NUMBER_OF_STARS}
                onChange={handleStarRatingChange}
                state={starState}
                name={NAME.star}
            />
            <PrettyHeader style={{ textAlign: "center", marginTop: "15px" }}>
                UNCONTROLLED
            </PrettyHeader>
            <Rating
                style={{ ...RATING_STYLE, height: "40px" }}
                iconFilled={filledHeart}
                iconDefault={defaultHeart}
                iconHover={hoverHeart}
                iconActive={activeHeart}
                maxRating={NUMBER_OF_STARS}
                name={"uncontrolled"}
            />
        </div>
    )
}

export default App
