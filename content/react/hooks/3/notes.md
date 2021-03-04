## The Http Requests and Error Boundaries

> Summary: Be able to gracefully do http requests (like fetching pokemon data) for end-users and give them a good experience. Display appropriate views depending on the status of the http request and handle unexpected errors.

-   [Fetch pokemons](https://graphql-pokemon2.vercel.app) from [this project](https://github.com/lucasbento/graphql-pokemon/pull/14)!
-   Write a form where users can enter the pokemon name and your app fetches and displays that pokemon's data
-   When a request hasn't been made yet, show `no pokemon yet, please submit a pokemon!`
-   While fetching the pokemon data, show a `loading` screen
-   Display the pokemon data as soon as it arrives
-   When something goes wrong (like a `network error`, or a `pokemon not existing in the database`), the error should be displayed at the bottom of the search bar.
-   There should be a button to `try again` after an error. Upon clicking this, the `no pokemon yet, please submit a pokemon!` will be shown and the current string on the search bar would be removed.
-   After an error, the user should be able to use the search bar to search for a new pokemon without having to click the `try again` button.

-   This exercise is a modified version of [KCD's exercise](https://react-hooks.netlify.app/6). Here's [KCD's solution](https://github.com/kentcdodds/react-hooks/blob/main/src/final/04.extra-3.js)

### My Solution

> Note: This solution doesn't use a library, but in most cases that you do. Use a library like [Tanner Linsley's React Query](https://github.com/tannerlinsley/react-query) to help do this instead of implementing everything on your own from scratch.

My Top Level Component

```jsx
const PokemonSuggestion = ({ name, buttonSubmit }) => {
    return <button onClick={() => buttonSubmit(name)}>{name}</button>
}

function App() {
    const [submittedValue, onSubmit] = useState("")
    const [incompleteValue, setIncompleteValue] = useState("")

    const resetFunction = () => {
        setIncompleteValue("")
        onSubmit("")
    }

    function buttonSubmit(value) {
        setIncompleteValue(value)
        onSubmit(value)
    }

    const tryPikachu = <PokemonSuggestion {...{ name: "Pikachu", buttonSubmit }} />
    const tryNineTales = <PokemonSuggestion {...{ name: "Ninetales", buttonSubmit }} />
    const tryCharizard = <PokemonSuggestion {...{ name: "Charizard", buttonSubmit }} />

    return (
        <>
            <SingleFieldForm
                onSubmit={buttonSubmit}
                setValue={setIncompleteValue}
                value={incompleteValue}
            >
                <PrettyInputField placeholder="Which pokemon?" />
                <FormSubmit>Fetch!</FormSubmit>
                <span>
                    Out of ideas? Try {tryPikachu}, {tryCharizard}, or {tryNineTales}.
                </span>
            </SingleFieldForm>
            <CustomErrorBoundary
                FallbackComponent={PokemonErrorView}
                key={submittedValue}
                {...{ resetFunction }}
            >
                <PokemonInfoCard pokemonName={submittedValue} />
            </CustomErrorBoundary>
        </>
    )
}

export default App
```

Pokemon Info Card

```jsx
const PokemonInfoCard = ({ pokemonName }) => {
    const [state, setState] = useState({
        status: pokemonName ? "pending" : "idle",
        pokemonData: null,
        error: null,
    })

    useEffect(() => {
        if (!pokemonName) {
            setState({ status: "idle" })
            return
        }

        setState({ status: "pending" })
        fetchPokemon(pokemonName).then(
            pokemonData => setState({ status: "resolved", pokemonData }),
            error => setState({ status: "rejected", error })
        )
    }, [pokemonName])

    const { status, pokemonData, error } = state

    if (status === "resolved") {
        return <PokemonInfoView {...{ pokemonData }} />
    } else if (status === "idle") {
        return <PokemonIdleView />
    } else if (status === "pending") {
        return <PokemonLoadingView {...{ pokemonName }} />
    } else if (status === "rejected") {
        throw error
    }

    throw new Error("This should be impossible")
}
```

My Custom Error Boundary

```jsx
class CustomErrorBoundary extends Component {
    state = { error: null }

    static getDerivedStateFromError(error) {
        return { error }
    }

    render() {
        const { error } = this.state
        const { resetFunction, FallbackComponent, children } = this.props
        if (error) {
            return <FallbackComponent {...{ error, resetFunction }} />
        }

        return children
    }
}
```

An example error view

```jsx
function PokemonErrorView({ error, resetFunction }) {
    return (
        <PokemonDataView>
            <h1>Error! :(</h1>
            <span role="alert">{error.message}</span>
            <button onClick={resetFunction}>Try again</button>
        </PokemonDataView>
    )
}
```
