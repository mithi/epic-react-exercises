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
    <span style={{ fontSize: "55px", color: "orange" }}>
        <FaStar />
    </span>
)
const greyStar = (
    <span style={{ fontSize: "50px", color: "grey" }}>
        <FaRegStar />
    </span>
)

/*
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

const HEART_MULTIPLIER = 2

*/

const NUMBER_OF_STARS = 5

const App = () => {
    const [starRating, setStarRating] = useState({
        action: null,
        state: { rating: 0, hoverIndex: null, lastEvent: actionTypes.mouseLeave },
    })

    function handleStarRatingChange(state, action) {
        setStarRating({ state, action })
    }

    return (
        <div>
            <SmallSpan>STAR STATE: {JSON.stringify(starRating.state)}</SmallSpan>
            <br />
            <SmallSpan>STAR RATING ACTION: {JSON.stringify(starRating.action)}</SmallSpan>
            <br />
            <PrettyHeader>controlled</PrettyHeader>
            <Rating
                style={{
                    height: "50px",
                    margin: "10px",
                    display: "flex",
                    width: "100%",
                    justifyContent: "center",
                    alignItems: "center",
                }}
                iconFilled={darkOrangeStar}
                iconDefault={greyStar}
                iconHover={orangeStar}
                iconActive={orangeStarBigger}
                maxRating={NUMBER_OF_STARS}
                onChange={handleStarRatingChange}
                state={starRating.state}
            />
            <PrettyHeader>Uncontrolled</PrettyHeader>
            <Rating
                style={{
                    height: "50px",
                    margin: "10px",
                    display: "flex",
                    width: "100%",
                    justifyContent: "center",
                    alignItems: "center",
                }}
                iconFilled={darkOrangeStar}
                iconDefault={greyStar}
                iconHover={orangeStar}
                iconActive={orangeStarBigger}
                maxRating={NUMBER_OF_STARS}
            />
        </div>
    )
}

/*

            <Rating
                style={{
                    height: "20px",
                    display: "flex",
                    width: "100%",
                    justifyContent: "center",
                    alignItems: "center",
                }}
                iconFilled={filledHeart}
                iconDefault={defaultHeart}
                iconHover={hoverHeart}
                iconActive={activeHeart}
                maxRating={NUMBER_OF_STARS * HEART_MULTIPLIER}
            />

 */
export default App
