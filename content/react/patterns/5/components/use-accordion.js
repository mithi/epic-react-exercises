import { useReducer } from "react"
const actionTypes = { togglePanel: "toggle_panel" }

function defaultAccordionReducer(openedPanelIds, action) {
    if (action.type === actionTypes.togglePanel) {
        return openedPanelIds.includes(action.panelId)
            ? openedPanelIds.filter(i => i !== action.panelId)
            : [...openedPanelIds, action.panelId]
    }
    throw new Error(`Unhandled type in accordionReducer: ${action.type}`)
}

function useAccordion({ reducer = defaultAccordionReducer } = {}) {
    const [openedPanelIds, dispatch] = useReducer(reducer, [0])
    const togglePanelId = panelId => dispatch({ type: actionTypes.togglePanel, panelId })
    return { openedPanelIds, togglePanelId }
}

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

// if we're opening this panel, then this is the only panel that's open
function onlyOnePanelOpenReducer(openedPanelIds, action) {
    const shouldBeOpened =
        action.type === actionTypes.togglePanel &&
        !openedPanelIds.includes(action.panelId)

    if (shouldBeOpened) {
        return [action.panelId]
    }
}

// get a list of reducer functions ordered by priority
// runs each reducer one by one. If that reducer returns a result,
// don't run the next ones.
// in other words, the combine reducer returns a functin that
// run each reducer until one of them, returns a result, which it will then return
function combineReducers(...reducers) {
    return (state, action) => {
        for (const reducer of reducers) {
            const result = reducer(state, action)
            if (result) return result
        }
    }
}

export {
    useAccordion,
    defaultAccordionReducer,
    actionTypes,
    atleastOnePanelOpenReducer,
    onlyOnePanelOpenReducer,
    combineReducers,
}
