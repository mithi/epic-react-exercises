import { SpinnerDots } from "components/spinner"
import { RoundedImage } from "components/pretty-defaults"
import getRandomRickAndMortyQuote from "./random-quotes"

const IdleView = () => (
    <div
        style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            margin: "30px",
        }}
    >
        <RoundedImage src="/rick-idle.png" height={60} width={60} />
        <RoundedImage src="/morty-idle.png" height={50} width={50} />
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
    <div
        style={{
            color: "red",
            margin: "20px",
        }}
    >
        Error! {message}
    </div>
)

export { IdleView, ErrorView, PendingView }
