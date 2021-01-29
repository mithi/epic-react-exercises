import axios from "axios"

const DELAY = 1500

function wait(ms, value) {
    return new Promise(resolve => setTimeout(resolve, ms, value))
}

const transformRickAndMortyData = result => {
    if (result.data.errors && result.data.errors[0].message) {
        return Promise.reject(new Error(result.data.errors[0].message))
    }

    const character = result.data.data.character

    const { name, status, species, gender, origin, location, image } = character

    return {
        name,
        status,
        species,
        gender,
        origin: origin.name,
        location: location.name,
        imageUrl: image,
    }
}

const delayedFetchRickAndMortyCharacterById = async characterId => {
    let query = `
    {
        character(id: ${characterId}) {
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
