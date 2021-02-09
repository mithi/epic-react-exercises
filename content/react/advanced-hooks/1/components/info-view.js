import { PrettyHeader, RoundedImage } from "components/pretty-defaults"
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

const Li = ({ children }) => <li style={{ margin: 0, padding: 0 }}>{children}</li>

const InfoView = ({ data }) => {
    const { name, status, species, gender, origin, location, imageUrl, id } = data
    const info = (
        <ul>
            <Li>status: {status}</Li>
            <Li>species: {species}</Li>
            <Li>gender: {gender}</Li>
            <Li>location: {location}</Li>
            <Li>origin: {origin}</Li>
        </ul>
    )
    return (
        <div style={{ display: "flex", margin: "20px 0px", flexWrap: "no-wrap" }}>
            <RoundedImage
                src={imageUrl}
                alt={name}
                width="100px"
                height="100px"
                style={{ alignItems: "flex-start" }}
            />
            <div style={{ margin: "0px 20px" }}>
                <PrettyHeader style={{ fontSize: "25px" }}>
                    #{id}. {name}
                </PrettyHeader>
                {info}
            </div>
        </div>
    )
}

export default InfoView
