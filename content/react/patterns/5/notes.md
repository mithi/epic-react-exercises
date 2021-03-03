## The State Reducer Pattern

> Summary: Create a `useAccordion` hook that people can easily add their own functionality using the state reducer pattern. Examples of functionality they might want to add is enforcing not having more than one panel at a time or making sure that at least one panel is open at a time or both.

### Background

Learn more about [The State Reducer Pattern in KCD's blog](https://kentcdodds.com/blog/the-state-reducer-pattern-with-react-hooks).
This exercise is based on KCD's [Simply React talk](https://github.com/kentcdodds/simply-react).

The key here is that hooks can accept a custom `reducer` function, and users can combine several reducers using a `combineReducer` function like below

```js
// get a list of reducer functions ordered by priority
// runs each reducer one by one.
// If that reducer returns a result, don't run the next ones.
// in other words, the combine reducer returns a function that
// run each reducer until one of them returns a result, given the passed state and action
function combineReducers(...reducers) {
    return (state, action) => {
        for (const reducer of reducers) {
            const result = reducer(state, action)
            if (result) return result
        }
    }
}
```

Your module could expose the following to the users:

1. The `useAccordion` hook
2. The default reducer `defaultAccordionReducer`
3. The function to create a function that chains the reducers together `combineReducer`
4. The action types the `reducer` can process like `togglePanelId`
5. Other reducers to override the defaullts like ` atleastOnePanelOpenReducer` and `onlyOnePanelOpenReducer`

### My solution

> Important Note / TODO / FIXME: This accordion implementation is not yet accessible, to make it accessible check [w3.org](https://www.w3.org/TR/wai-aria-practices-1.1/examples/accordion/accordion.html)

The `useAccordion` hook is just four lines!

```js
function useAccordion({ reducer = defaultAccordionReducer } = {}) {
    const [openedPanelIds, dispatch] = useReducer(reducer, [0])
    const togglePanelId = panelId => dispatch({ type: actionTypes.togglePanel, panelId })
    return { openedPanelIds, togglePanelId }
}
```

You can have several action types, you can add a `reset` `actionType` if you like.

```js
const actionTypes = { togglePanel: "togglePanel" }
```

Here's the default accordion reducer which is just 8 lines of code.

```js
function defaultAccordionReducer(openedPanelIds, action) {
    if (action.type === actionTypes.togglePanel) {
        return openedPanelIds.includes(action.panelId)
            ? openedPanelIds.filter(i => i !== action.panelId)
            : [...openedPanelIds, action.panelId]
    }
    throw new Error(`Unhandled type in accordionReducer: ${action.type}`)
}
```

Here's the reducer that makes sure that atleast one panel is open

```js
function atleastOnePanelOpenReducer(openedPanelIds, action) {
    if (
        action.type === actionTypes.togglePanel &&
        openedPanelIds.includes(action.panelId) &&
        openedPanelIds.length < 2
    ) {
        return openedPanelIds
    }

    // if we don't need to override the default behavior, return nothing
    // this will indicate to the combine reducer to go run
    // the next reducer in line for the next possible behavior
    // (the next reducer  could be the default reducer / default behavior)
}
```

Here's the reducer that makes sure that only one panel is open at a time

```js
// if we're opening this panel, then this is the only panel that's open
function onlyOnePanelOpenReducer(openedPanelIds, action) {
    const shouldBeOpened =
        action.type === actionTypes.togglePanel &&
        !openedPanelIds.includes(action.panelId)

    if (shouldBeOpened) {
        return [action.panelId]
    }
}
```

Here's an example how you can use the hook

```jsx
const TowerAccordion = ({ reducer }) => {
    const { openedPanelIds, togglePanelId } = useAccordion({ reducer })

    return (
        <>
            {TOWERS.map((tower, panelId) => {
                const content = (
                    <h1>
                        The tower type of {tower.name} is {tower.type}
                    </h1>
                )

                return (
                    <div key={panelId} style={{ display: "flex" }}>
                        <button onClick={() => togglePanelId(panelId)}>
                            {tower.name}
                        </button>
                        {openedPanelIds.includes(panelId) && content}
                    </div>
                )
            })}
        </>
    )
}
```

And the top level component

```jsx
function App() {
    const [onlyOnePanelOpen, setOnlyOnePanelOpen] = useState(false)
    const [atLeastOnePanelOpen, setAtleastOnePanelOpen] = useState(false)

    let reducers = [defaultAccordionReducer]
    if (onlyOnePanelOpen) {
        reducers = [onlyOnePanelOpenReducer, ...reducers]
    }

    if (atLeastOnePanelOpen) {
        reducers = [atleastOnePanelOpenReducer, ...reducers]
    }

    const resetKey = `onlyOnePanel=${onlyOnePanelOpen}+atLeastOnePanel=${atLeastOnePanelOpen}`
    return (
        <>
            <div style={{ fontSize: "12px", margin: "10px" }}>
                <span>
                    (Note: Changing the according settings will reset the accordion state)
                </span>
                <br />
                {onlyOnePanelOpen
                    ? "✔ Only one panel can be open at a time"
                    : "✔ Multiple panels can be open"}
                <button onClick={() => setOnlyOnePanelOpen(!onlyOnePanelOpen)}>
                    {"-> (change)"}
                </button>
                <br />
                {atLeastOnePanelOpen
                    ? "✔ Prevent closing the last opened panel"
                    : "✔ It's okay to have no panels open"}
                <button onClick={() => setAtleastOnePanelOpen(!atLeastOnePanelOpen)}>
                    {"-> (change)"}
                </button>
            </div>
            <TowerAccordion key={resetKey} reducer={combineReducers(...reducers)} />
        </>
    )
}
```
