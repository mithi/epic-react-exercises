import { SpinnerDots } from "components/spinner"
import { RoundedImage } from "components/pretty-defaults"
import getRandomRickAndMortyQuote from "./random-quotes"

import { PrettyHeader, BorderedDiv, SmallSpan } from "components/pretty-defaults"
import { FaUser, FaUserTimes } from "components/icons"

const TOTALLY_CENTERED = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    textAlign: "center",
}

const Card = ({ children }) => (
    <div style={{ display: "flex", margin: "10px", flexWrap: "nowrap" }}>{children}</div>
)

const ImageCard = ({ children, style }) => (
    <BorderedDiv
        style={{
            ...TOTALLY_CENTERED,
            width: "100px",
            height: "100px",
            borderStyle: "dashed",
            margin: "5px",
            fontSize: "50px",
            ...style,
        }}
    >
        {children}
    </BorderedDiv>
)

const InfoCard = ({ children, header, style }) => (
    <div style={{ margin: "0 10px", ...style }}>
        <PrettyHeader Component="span" style={{ fontSize: "30px" }}>
            {header}
        </PrettyHeader>
        <br />
        <SmallSpan>{children}</SmallSpan>
    </div>
)

const InfoView = ({ data }) => {
    const { name, status, species, gender, origin, location, imageUrl, id } = data
    return (
        <Card>
            <ImageCard style={{ borderStyle: "solid" }}>
                <RoundedImage src={imageUrl} alt={name} width={100} height={100} />
            </ImageCard>
            <InfoCard header={name}>
                #{id}, {status}, {species}, {gender}. <br />
                origin: {origin}, <br /> location: {location}
            </InfoCard>
        </Card>
    )
}

const IdleView = () => {
    return (
        <Card>
            <ImageCard>
                <FaUser />
            </ImageCard>
            <InfoCard header={"???"} />
        </Card>
    )
}

const PendingView = () => {
    return (
        <Card>
            <ImageCard>
                <SpinnerDots />
            </ImageCard>
            <InfoCard>
                <p>{getRandomRickAndMortyQuote()}</p>
            </InfoCard>
        </Card>
    )
}

const ErrorView = ({ message }) => {
    return (
        <Card>
            <ImageCard style={{ borderColor: "red", color: "red" }}>
                <FaUserTimes />
            </ImageCard>
            <InfoCard header={"xxx"} style={{ color: "red" }}>
                ERROR: {message}
            </InfoCard>
        </Card>
    )
}

export { IdleView, ErrorView, PendingView, InfoView }
