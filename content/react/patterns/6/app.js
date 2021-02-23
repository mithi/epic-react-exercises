import { useState } from "react"
import { SmallSpan } from "components/pretty-defaults"
import { FaStar, FaRegStar } from "components/icons"
import { Rating } from "./components/rating"

const redStar = (
    <span style={{ fontSize: "50px", color: "red" }}>
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

const App = () => {
    const [messages, setMessages] = useState({})
    function handleRatingChange(state, action) {
        setMessages({
            state,
            action,
        })
    }

    return (
        <div>
            <SmallSpan>STATE: {JSON.stringify(messages.state)}</SmallSpan>
            <br />
            <SmallSpan>ACTION: {JSON.stringify(messages.action)}</SmallSpan>

            <Rating
                style={{
                    height: "50px",
                    margin: "30px 0",
                    display: "flex",
                    width: "100%",
                    justifyContent: "center",
                    alignItems: "center",
                }}
                iconFilled={redStar}
                iconDefault={greyStar}
                iconHover={orangeStar}
                iconActive={orangeStarBigger}
                maxRating={7}
                initialRating={4}
                onChange={handleRatingChange}
            />
        </div>
    )
}

export default App
