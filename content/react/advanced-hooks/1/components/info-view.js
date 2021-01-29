import { PrettyHeader } from "components/pretty-defaults"
/*

data: {
    "name":"Michael Jenkins",
    "status":"Dead",
    "species":"Human",
    "gender":"Male",
    "origin":"unknown",
    "location":"Interdimensional Cable",
    "imageUrl":"https://rickandmortyapi.com/api/character/avatar/223.jpeg"
}
 */

const TOTALLY_CENTERED = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    textAlign: "center",
}

const IMAGE_STYLE = {
    borderRadius: "25%",
    padding: "5px",
    fontSize: "20px",
    marginBottom: "20px",
    ...TOTALLY_CENTERED,
}

const InfoView = ({ data }) => {
    const { name, status, species, gender, origin, location, imageUrl, id } = data
    const info = (
        <ul>
            <li>status: {status}</li>
            <li>species: {species}</li>
            <li>gender: {gender}</li>
            <li>location: {location}</li>
            <li>origin: {origin}</li>
        </ul>
    )
    return (
        <div style={{ display: "flex", margin: "20px 0px", flexWrap: "no-wrap" }}>
            <img
                src={imageUrl}
                alt={name}
                style={IMAGE_STYLE}
                width="125px"
                height="125px"
            />
            <div style={{ margin: "0px 20px" }}>
                <PrettyHeader style={{ fontSize: "30px" }}>
                    #{id}. {name}
                </PrettyHeader>
                {info}
            </div>
        </div>
    )
}

export default InfoView
