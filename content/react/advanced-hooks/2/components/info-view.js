import { PrettyHeader, BorderedDiv } from "components/pretty-defaults"
import { FaUser, FaUserTimes } from "react-icons/fa"

const TOTALLY_CENTERED = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    textAlign: "center",
}

const IMAGE_STYLE = {
    borderRadius: "25%",
    margin: "5px",
    fontSize: "20px",
    marginBottom: "20px",
    ...TOTALLY_CENTERED,
}

const Card = ({ children }) => (
    <div style={{ display: "flex", margin: "20px 0px", flexWrap: "no-wrap" }}>
        {children}
    </div>
)

const ImageCard = ({ children, style }) => (
    <BorderedDiv
        style={{
            width: "125px",
            height: "125px",
            borderStyle: "dashed",
            ...TOTALLY_CENTERED,
            ...IMAGE_STYLE,
            ...style,
        }}
    >
        <span style={{ fontSize: "30px" }}>{children}</span>
    </BorderedDiv>
)

const InfoCard = ({ children, header, style }) => (
    <div style={{ margin: "0px 20px", ...style }}>
        <PrettyHeader style={{ fontSize: "30px", marginTop: "10px" }}>
            {header}
        </PrettyHeader>
        <span style={{ fontSize: "14px", lineHeight: "1" }}>{children}</span>
    </div>
)

const InfoView = ({ data }) => {
    const { name, status, species, gender, origin, location, imageUrl, id } = data
    return (
        <Card>
            <img
                src={imageUrl}
                alt={name}
                style={IMAGE_STYLE}
                width="125px"
                height="125px"
            />
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

export { IdleView, ErrorView }
export default InfoView
