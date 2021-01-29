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
        <div style={{ display: "flex", justifyContent: "center" }}>
            <div className="lds-ellipsis">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
        <p style={{ margin: "10px", fontSize: "20px" }}>{getRandomRickAndMortyQuote()}</p>
        <div style={{ display: "flex", justifyContent: "center" }}>
            <MortyColoredSvg />
            <RickColoredSvg />
        </div>
    </>
)

const ErrorView = ({ message }) => (
    <div>
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "50px",
                marginBottom: "10px",
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
            }}
        >
            Error! {message}
        </div>
    </div>
)

export { IdleView, ErrorView, PendingView }
