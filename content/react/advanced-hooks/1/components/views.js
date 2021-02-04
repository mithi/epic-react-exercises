import { SpinnerDots } from "components/spinner"
import MortyColoredSvg from "../svg/morty-smith-colored.svg"
import RickColoredSvg from "../svg/rick-sanchez-colored.svg"
import MortyBwSvg from "../svg/morty-smith-bw.svg"
import RickBwSvg from "../svg/rick-sanchez-bw.svg"
import getRandomRickAndMortyQuote from "./random-quotes"

const IdleView = () => (
    <div style={{ display: "flex", justifyContent: "center", margin: "30px" }}>
        <MortyColoredSvg />
        <RickColoredSvg />
    </div>
)

const PendingView = () => (
    <>
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
            }}
        >
            <SpinnerDots />
            <p style={{ margin: "10px", fontSize: "20px" }}>
                {getRandomRickAndMortyQuote()}
            </p>
            <SpinnerDots />
        </div>
    </>
)

const ErrorView = ({ message }) => (
    <div>
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "30px",
            }}
        >
            <div
                style={{
                    display: "inline-flex",
                    justifyContent: "center",
                    borderRadius: "50px",
                    backgroundColor: "#e30051",
                    padding: "20px",
                }}
            >
                <MortyBwSvg />
                <RickBwSvg />
            </div>
        </div>
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                margin: "30px",
            }}
        >
            Error! {message}
        </div>
    </div>
)

export { IdleView, ErrorView, PendingView }
