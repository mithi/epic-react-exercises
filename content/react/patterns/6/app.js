import { useReducer, useState } from "react"
import { SmallSpan, PrettyHeader } from "components/pretty-defaults"
import { ColoredButton } from "components/button"

const actionTypes = { onClick: "onClick" }

const myButtonWithStateDisplayReducer = (state, action) => {
    if (action.type === actionTypes.onClick) {
        return { count: state.count + 1 }
    }

    throw Error(`unhandled action type ${action.type}`)
}

const useMyButtonWithStateDisplay = ({ onChange, controlledState }) => {
    const [stateFromReducer, dispatch] = useReducer(myButtonWithStateDisplayReducer, {
        count: 0,
    })

    const stateIsControlled = controlledState !== undefined
    const state = stateIsControlled ? controlledState : stateFromReducer

    const dispatchWithOnChange = action => {
        if (!stateIsControlled) {
            return dispatch(action)
        }

        if (onChange) {
            const suggestedState = myButtonWithStateDisplayReducer(state, action)
            onChange(suggestedState, action)
            return
        }

        throw new Error(
            "If your state is controlled, then you must also supply an onChange handler"
        )
    }

    return {
        state,
        buttonProps: {
            onClick: () => dispatchWithOnChange({ type: actionTypes.onClick }),
        },
    }
}

const MyButtonWithStateDisplay = ({ onChange, state: controlledState }) => {
    const { state, buttonProps } = useMyButtonWithStateDisplay({
        onChange,
        controlledState,
    })

    return (
        <div style={{ width: "100%" }}>
            <ColoredButton {...buttonProps}> Click Me! </ColoredButton>
            <pre> {JSON.stringify(state, null, 2)}</pre>
        </div>
    )
}

const MAX_VALUE = 512

const App = () => {
    const [currentState, setState] = useState({
        count: 1,
    })

    const handleChange = (suggestedState, action) => {
        if (action.type !== actionTypes.onClick) {
            throw new Error(
                `This action type ${action.type} is not supposed to be in the API`
            )
        }

        let count = currentState.count * 2 > MAX_VALUE ? 1 : currentState.count * 2

        setState({
            count,
            previous: currentState.count,
            suggested: suggestedState.count,
        })
    }

    return (
        <div style={{ display: "flex" }}>
            <div style={{ width: "50%", margin: "5px" }}>
                <PrettyHeader>Uncontrolled</PrettyHeader>
                <MyButtonWithStateDisplay />
                <SmallSpan>
                    (Starts count at 0, increments by one on each click indefinitely.
                    Displays the state which is only the current count)
                </SmallSpan>
            </div>
            <div style={{ width: "50%", margin: "5px" }}>
                <PrettyHeader>Controlled</PrettyHeader>
                <MyButtonWithStateDisplay onChange={handleChange} state={currentState} />
                <SmallSpan>
                    (Starts count at 1, doubles value on each click until it reaches{" "}
                    {MAX_VALUE} (it will restart after). Aside from the count, it also
                    displays previous count and suggested count)
                </SmallSpan>
            </div>
        </div>
    )
}

export default App
