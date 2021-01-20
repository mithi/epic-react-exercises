import PokemonSearchSection from "./components/pokemon-search"
import PokemonDataView from "./components/pokemon-data-view"
import axios from "axios"
// useFetchPokemon
// PokemonDataView
// NoPokemonView
// PokemonInfoSection
// PokemonSearchSection

const fetchPokemon = name => {
    axios({
        url: "https://graphql-pokemon2.vercel.app/",
        method: "post",
        data: {
            query: `
            query PokemonInfo($name: String = "${name}") {
                pokemon(name: $name) {
                    number
                    name
                    image
                    attacks {
                        special {
                        name
                        type
                        damage
                        }
                    }
                }
            }
        `,
        },
    })
        .then(result => {
            return { data: result.data, error: null }
            console.log(result.data)
        })
        .catch(error => {
            return { data: null, error }
        })
}

const App = () => {
    fetchPokemon("xxxx")
    return (
        <>
            <PokemonSearchSection />
            <PokemonDataView />
        </>
    )
}

export default App
