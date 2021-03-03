import {
    FaStar,
    FaRegStar,
    FaHeart,
    FaHeartBroken,
    FaRegHeart,
    FaHeartbeat,
} from "components/icons"

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
    <span style={{ fontSize: "30px", color: "grey" }}>
        <FaRegHeart />
    </span>
)
const activeHeart = (
    <span style={{ fontSize: "30px", color: "#fd79a8" }}>
        <FaHeartBroken />
    </span>
)

const hoverHeart = (
    <span style={{ fontSize: "30px", color: "#fd79a8" }}>
        <FaHeartbeat />
    </span>
)

const filledHeart = (
    <span style={{ fontSize: "30px", color: "#e84393" }}>
        <FaHeart />
    </span>
)

export {
    darkOrangeStar,
    orangeStar,
    greyStar,
    orangeStarBigger,
    defaultHeart,
    activeHeart,
    hoverHeart,
    filledHeart,
}
