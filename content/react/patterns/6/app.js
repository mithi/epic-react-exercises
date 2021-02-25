import { useState } from "react"
import { SmallSpan, PrettyHeader } from "components/pretty-defaults"
import {
    FaStar,
    FaRegStar,
    FaHeart,
    FaHeartBroken,
    FaRegHeart,
    FaHeartbeat,
} from "components/icons"
import { Rating, actionTypes } from "./components/rating"

const darkOrangeStar = (
    <span style={{ fontSize: "50px", color: "#e17055" }}>
        <FaStar />
    </span>
)

const orangeStar = (
    <span style={{ fontSize: "50px", color: "orange" }}>
        <FaStar />
    </span>
)

const orangeStarBigger = (
    <span style={{ fontSize: "60px", color: "orange" }}>
        <FaStar />
    </span>
)
const greyStar = (
    <span style={{ fontSize: "50px", color: "grey" }}>
        <FaRegStar />
    </span>
)

const defaultHeart = (
    <span style={{ fontSize: "20px", color: "grey" }}>
        <FaRegHeart />
    </span>
)
const activeHeart = (
    <span style={{ fontSize: "20px", color: "#fd79a8" }}>
        <FaHeartBroken />
    </span>
)

const hoverHeart = (
    <span style={{ fontSize: "20px", color: "#fd79a8" }}>
        <FaHeartbeat />
    </span>
)

const filledHeart = (
    <span style={{ fontSize: "20px", color: "#e84393" }}>
        <FaHeart />
    </span>
)

const NUMBER_OF_STARS = 5
const HEART_MULTIPLIER = 2
const NUMBER_OF_HEARTS = NUMBER_OF_STARS * HEART_MULTIPLIER
const NAME = { heart: "heart", star: "star" }
const RATING_STYLE = {
    height: "70px",
    padding: "5px",
    display: "flex",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
}
const App = () => {
    const [syncRating, setSyncRating] = useState({
        action: null,
        state: { rating: 0, hoverIndex: null, lastEvent: actionTypes.mouseLeave },
    })

    function handleStarRatingChange(suggestedState, action) {
        setSyncRating({
            state: {
                ...suggestedState,
                rating: suggestedState.rating * HEART_MULTIPLIER,
                hoverIndex:
                    suggestedState.hoverIndex === null
                        ? null
                        : suggestedState.hoverIndex * HEART_MULTIPLIER + 1,
            },
            action: { ...action, name: NAME.star },
        })
    }

    function handleHeartRatingChange(suggestedState, action) {
        if (
            suggestedState.rating === syncRating.state &&
            action.type === actionTypes.rate
        ) {
            setSyncRating({ state: suggestedState, action: { action, name: NAME.heart } })
        }
        const isEven = suggestedState.rating % 2 === 0
        const evenRating = isEven ? suggestedState.rating : suggestedState.rating + 1

        const evenHoverIndex =
            suggestedState.hoverIndex === null
                ? null
                : suggestedState.hoverIndex % 2 === 0
                ? suggestedState.hoverIndex + 1
                : suggestedState.hoverIndex

        setSyncRating({
            state: {
                ...suggestedState,
                rating: evenRating,
                hoverIndex: evenHoverIndex,
            },
            action: { ...action, name: NAME.heart },
        })
    }

    const starState = {
        ...syncRating.state,
        hoverIndex:
            syncRating.state.hoverIndex === null
                ? null
                : Math.floor(syncRating.state.hoverIndex / HEART_MULTIPLIER),
        rating: Math.floor(syncRating.state.rating / HEART_MULTIPLIER),
    }

    const heartState = syncRating.state

    return (
        <div>
            <p>
                <SmallSpan>SYNC STATE: {JSON.stringify(syncRating.state)}</SmallSpan>
                <br />
                <SmallSpan>SYNC ACTION: {JSON.stringify(syncRating.action)}</SmallSpan>
            </p>
            <PrettyHeader style={{ textAlign: "center", margin: "5px" }}>
                controlled
            </PrettyHeader>
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
            <Rating
                style={{ ...RATING_STYLE, height: "35px" }}
                iconFilled={filledHeart}
                iconDefault={defaultHeart}
                iconHover={hoverHeart}
                iconActive={activeHeart}
                maxRating={NUMBER_OF_HEARTS}
                onChange={handleHeartRatingChange}
                state={heartState}
                name={NAME.heart}
            />
            <PrettyHeader style={{ textAlign: "center" }}>uncontrolled</PrettyHeader>
            <Rating
                style={{ ...RATING_STYLE, height: "35px" }}
                iconFilled={filledHeart}
                iconDefault={defaultHeart}
                iconHover={hoverHeart}
                iconActive={activeHeart}
                maxRating={NUMBER_OF_STARS}
                name={NAME.heart}
            />
        </div>
    )
}

export default App
