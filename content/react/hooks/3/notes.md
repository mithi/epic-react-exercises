## [The Http Request Exercise](https://react-hooks.netlify.app/6)

-   [Fetch pokemons](https://graphql-pokemon2.vercel.app) from [this project](https://github.com/lucasbento/graphql-pokemon/pull/14)!
-   A form where users can enter the pokemon name and your app fetches and displays that pokemon's data
-   When a request hasn't been made yet, show `no pokemon yet, please submit a pokemon!`
-   While fetching the pokemon data, show a `loading` screen
-   Display the pokemon data as soon as it arrives
-   When something goes wrong (like a `network error`, or a `pokemon not existing in the database`), the error should be displayed at the bottom of the search bar. The search bar should ALWAYS be mounted.
-   There should be a button to `try again` after an error. Upon clicking this , the `no pokemon yet, please submit a pokemon!` will be shown and the current string on the search bar would be removed.
-   After an error, the user should be able to use the search bar to search for a new pokemon without having to click the `try again` button.
-   [Kent's Implementation](https://github.com/kentcdodds/react-hooks/blob/main/src/final/04.extra-3.js)

### My Implementation

My Top Level Component

```jsx
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

    return (
        <>
            <SmallSpan>
                Out of ideas? Try{" "}
                <PokemonSuggestion {...{ name: "Pikachu", buttonSubmit }} />,{" "}
                <PokemonSuggestion {...{ name: "Charizard", buttonSubmit }} />, or{" "}
                <PokemonSuggestion {...{ name: "Ninetales", buttonSubmit }} />
            </SmallSpan>
            <SingleFieldForm {...{ setIncompleteValue, incompleteValue, onSubmit }}>
                <PrettyInputField placeholder="Which pokemon?" />
                <SubmitButton>Fetch!</SubmitButton>
            </SingleFieldForm>
            <CustomErrorBoundary
                FallbackComponent={PokemonErrorView}
                {...{ resetFunction, key: submittedValue }}
            >
                <PokemonInfoCard pokemonName={submittedValue} />
            </CustomErrorBoundary>
        </>
    )
}
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
