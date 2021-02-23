import { FaStar, FaRegStar } from "components/icons"
import { Rating } from "./components/rating"

const redStar = (
    <div style={{ fontSize: "50px", color: "red" }}>
        <FaStar />
    </div>
)

const orangeStar = (
    <div style={{ fontSize: "50px", color: "orange" }}>
        <FaStar />
    </div>
)

const orangeStarBigger = (
    <div style={{ fontSize: "55px", color: "orange" }}>
        <FaStar />
    </div>
)
const greyStar = (
    <div style={{ fontSize: "50px", color: "grey" }}>
        <FaRegStar />
    </div>
)

const App = () => {
    return (
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
        />
    )
}

export default App
