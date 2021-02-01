import axios from "axios"

// delay for a while before starting to fetch
// because I want the use to be able to read the
// rick and morty quotes available at the loading screen :D
const DELAY = 1500

function wait(ms, value) {
    return new Promise(resolve => setTimeout(resolve, ms, value))
}

const transformRickAndMortyData = result => {
    if (result.data.errors && result.data.errors[0].message) {
        return Promise.reject(new Error(result.data.errors[0].message))
    }

    const character = result.data.data.character

    const { name, status, species, gender, origin, location, image, id } = character

    return {
        name,
        status,
        species,
        gender,
        origin: origin.name,
        location: location.name,
        imageUrl: image,
        id,
    }
}

const delayedFetchRickAndMortyCharacterById = async characterId => {
    let query = `
    {
        character(id: ${characterId}) {
            id,
            name
            status
            species
            type
            gender
            origin { name }
            location { name }
            image

        }
    }
`
    return axios({
        url: "https://rickandmortyapi.com/graphql",
        method: "post",
        data: { query },
    })
        .then(axiosResult => {
            return wait(DELAY, axiosResult).then(result => {
                return transformRickAndMortyData(result)
            })
        })
        .catch(error => {
            return Promise.reject(new Error(error.message))
        })
}

export default delayedFetchRickAndMortyCharacterById
