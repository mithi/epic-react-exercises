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

const RATING_STYLE = {
    height: "60px",
    margin: "10px",
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

    function handleSyncRatingChange(state, action) {
        setSyncRating({ state, action })
    }

    return (
        <div>
            <SmallSpan>SYNC STATE: {JSON.stringify(syncRating.state)}</SmallSpan>
            <br />
            <SmallSpan>SYNC ACTION: {JSON.stringify(syncRating.action)}</SmallSpan>
            <br />
            <PrettyHeader>controlled</PrettyHeader>
            <Rating
                style={RATING_STYLE}
                iconFilled={darkOrangeStar}
                iconDefault={greyStar}
                iconHover={orangeStar}
                iconActive={orangeStarBigger}
                maxRating={NUMBER_OF_STARS}
                onChange={handleSyncRatingChange}
                state={syncRating.state}
                name="star"
            />
            <Rating
                style={RATING_STYLE}
                iconFilled={filledHeart}
                iconDefault={defaultHeart}
                iconHover={hoverHeart}
                iconActive={activeHeart}
                maxRating={NUMBER_OF_STARS}
                onChange={handleSyncRatingChange}
                state={syncRating.state}
                name="heart"
            />
        </div>
    )
}

export default App
