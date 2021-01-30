## [The Http Request Exercise](https://react-hooks.netlify.app/6)

-   [Fetch pokemons using this API](https://graphql-pokemon2.vercel.app). See also: [repository](https://github.com/lucasbento/graphql-pokemon/pull/14)
-   A form where users can enter the pokemon name and your app fetches and displays that pokemon's data
-   When a request hasn't been made yet, show `no pokemon yet, please submit a pokemon!`
-   While fetching the pokemon data, show a `loading` screen
-   Display the pokemon data as soon as it arrives
-   When something goes wrong (like a `network error`, or a `pokemon not existing in the database`), the error should be displayed at the bottom of the search bar. The search bar should ALWAYS be mounted.
-   There should be a button to `try again` after an error. Upon clicking this , the `no pokemon yet, please submit a pokemon!` will be shown and the current string on the search bar would be removed.
-   After an error, the user should be able to use the search bar to search for a new pokemon without having to click the `try again` button.
-   [Kent's Implementation](https://github.com/kentcdodds/react-hooks/blob/main/src/final/04.extra-3.js)
-   My Implementation: The [top level app](https://github.com/mithi/epic-notes/blob/main/content/react/hooks/3/app.js) and its [components](https://github.com/mithi/epic-notes/tree/main/content/react/hooks/3/components)

## A Few Code Snippets

My Top Level Component

```jsx
function App() {
    const [submittedName, setSubmittedName] = useState("")
    const [incompleteName, setIncompleteName] = useState("")

    const resetFunction = () => {
        setIncompleteName("")
        setSubmittedName("")
    }

    return (
        <>
            <PokemonSearchbar
                pokemonName={submittedName}
                onSubmit={name => setSubmittedName(name)}
                {...{ incompleteName, setIncompleteName }}
            />
            <CustomErrorBoundary
                FallbackComponent={PokemonErrorView}
                {...{ resetFunction, key: submittedName }}
            >
                <PokemonInfoCard pokemonName={submittedName} />
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

## My implementation

1.  It's better to put all the states in one state object (ie `{status, pokemonData, error}`), instead of having several `useState()` declarations.
    -   Aside from simplicity, it's because each state change could trigger an immediate rerender, which we don't intend to do.
2.  [PokemonInfoCard](https://github.com/mithi/epic-notes/blob/88e640ea4faa7ad7d536aa4f23a837c50abd3fd8/content/react/hooks/3/components/pokemon-info-card.js#L48) takes a `pokemonName` and fetches the data.
    -   It contains the logic of what to render depending on its status (`idle`, `pending`, `rejected`, `resolved`). It manages three things: The current `status`, and the `error` or `pokemonData` if any.
3.  [CustomErrorBoundary](https://github.com/mithi/epic-notes/blob/main/content/react/hooks/3/components/custom-error-boundary.js) wraps the `PokemonInfoCard` which takes a `key`, `FallbackComponent`, and `resetFunction`.
    -   If an error occurs, the boundary will render the supplied `FallbackComponent`, instead of its children. - The `resetFunction` is a function (we define and provide) that's intended to be used by the `FallbackComponent` to trigger unmounting and mounting of a new `ErrorBoundary`.
    -   Modifying a component's `key` will trigger a rerender, and that's what the `resetFunction` (that we supplied) must do.
4.  [Put it all together](https://github.com/mithi/epic-notes/blob/main/content/react/hooks/3/app.js), the overall component, only has two main components, the `pokemonSearchbar` and `pokemonInfoCard` wrapped by `CustomErrorBoundary`
    -   It now only has two states which is `submittedName` and `incompleteName`. `submittedName` is NOT necessarily a real pokemon name, it is whatever the string is in the search bar when the submit button is clicked..
    -   `incompleteName` used to be handled by the search bar component, but this state was lifted up because, it is required to reset the boundary function.
    -   The `resetFunction` resets by setting the current `submittedName` to `""`. `""` would never be equal to a previous `submittedName` because our user interface would not allow that to be submitted. This guarantees that the error boundary would be remounted.

## ToDos

-   Refactor the [data views module](https://github.com/mithi/epic-notes/blob/main/content/react/hooks/3/components/pokemon-data-view.js)
-   How to refactor to use local storage so that the previously fetched pokemon data will still be displayed on refresh?

# END
