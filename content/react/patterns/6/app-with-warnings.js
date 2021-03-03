import { useReducer, useState, useEffect, useRef } from "react"
import { ColoredButton } from "components/button"
import { SmallSpan, OnClickText } from "components/pretty-defaults"
import warning from "warning"

const warnUncontrolledToControlled = (componentName, controlPropName) =>
    `\`${componentName}\` is changing from uncontrolled to be controlled.
        Components should not switch from uncontrolled to controlled (or vice versa).
        Decide between using a controlled or uncontrolled \`${componentName}\` for the lifetime of the component.
        Check the \`${controlPropName}\` prop.`

const warnControlledToUncontrolled = (
    componentName,
    controlPropName
) => `\`${componentName}\` is changing from controlled to be uncontrolled.
    Components should not switch from controlled to uncontrolled (or vice versa).
    Decide between using a controlled or uncontrolled \`${componentName}\` for the lifetime of the component.
    Check the \`${controlPropName}\` prop.`

const warnControlPropWithoutOnChange = (
    controlPropName,
    componentName,
    onChangePropName,
    defaultValuePropName,
    readOnlyPropName
) =>
    `A \`${controlPropName}\` prop was provided to \`${componentName}\` without an \`${onChangePropName}\` handler.
    This will result in a read-only \`${controlPropName}\` value.
    If you want it to be mutable, use \`${defaultValuePropName}\`.
    Otherwise, set either \`${onChangePropName}\` or \`${readOnlyPropName}\`.`

function useControlledUncontrolledWarning(
    controlPropValue,
    controlPropName,
    componentName
) {
    // monitors the passed controlled "value" to the component
    const isControlled = controlPropValue != null
    const { current: wasControlled } = useRef(isControlled)

    useEffect(() => {
        warning(
            !(!wasControlled && isControlled),
            warnUncontrolledToControlled(componentName, controlPropName)
        )

        warning(
            !(wasControlled && !isControlled),
            warnControlledToUncontrolled(componentName, controlPropName)
        )
    }, [componentName, controlPropName, isControlled, wasControlled])
}

function useOnChangeReadOnlyWarning(
    controlPropValue,
    controlPropName,
    componentName,
    hasOnChange,
    readOnly,
    readOnlyPropName,
    defaultValuePropName,
    onChangePropName
) {
    const isControlled = controlPropValue != null

    useEffect(() => {
        // !(isControlled && !hasOnChange && !readOnly)
        // if a prop is controlled is must have an onChange handler, unless it's readonly.

        if (readOnly || !isControlled) {
            return
        }

        const controlledWithOnChange = isControlled && hasOnChange
        warning(
            controlledWithOnChange,
            warnControlPropWithoutOnChange(
                controlPropName,
                componentName,
                onChangePropName,
                defaultValuePropName,
                readOnlyPropName
            )
        )
    }, [
        componentName,
        controlPropName,
        isControlled,
        hasOnChange,
        readOnly,
        onChangePropName,
        defaultValuePropName,
        readOnlyPropName,
    ])
}
const actionTypes = { onClick: "onClick" }

const myButtonWithStateDisplayReducer = (state, action) => {
    if (action.type === actionTypes.onClick) {
        return { count: state.count + 1 }
    }

    throw Error(`unhandled action type ${action.type}`)
}

const useMyButtonWithStateDisplay = ({
    onChange,
    state: controlledState,
    defaultState = { count: 0 },
    readOnly,
} = {}) => {
    const { current: initialState } = useRef(defaultState)

    const [stateFromReducer, dispatch] = useReducer(
        myButtonWithStateDisplayReducer,
        initialState
    )

    // TODO: Show warnings only when not in production
    // if (process.env.NODE_ENV !== 'production')
    useControlledUncontrolledWarning(
        controlledState,
        "state",
        "useMyButtonWithStateDisplay"
    )

    useOnChangeReadOnlyWarning(
        controlledState,
        "state",
        "useMyButtonWithStateDisplay",
        Boolean(onChange),
        readOnly,
        "readOnly",
        "defaultState",
        "onChange"
    )

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

        // reaching this line should be impossible
    }

    return {
        state,
        buttonProps: {
            onClick: () => dispatchWithOnChange({ type: actionTypes.onClick }),
        },
    }
}

const MyButtonWithStateDisplay = ({ onChange, state: controlledState, readOnly }) => {
    const { state, buttonProps } = useMyButtonWithStateDisplay({
        onChange,
        state: controlledState,
        readOnly,
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

    const [isControlledDefaultTrue, setIsControlledDefaultTrue] = useState(true)
    const [isControlledDefaultFalse, setIsControlledDefaultFalse] = useState(false)
    const [isReadOnly, setIsReadOnly] = useState(true)

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
        <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
            <div style={{ margin: "10px" }}>
                <SmallSpan>
                    Example 1: Trigger warning from controlled to uncontrolled.
                </SmallSpan>
                <OnClickText
                    style={{ fontSize: "12px" }}
                    disabled={!isControlledDefaultTrue}
                    onClick={() => setIsControlledDefaultTrue(false)}
                >
                    {isControlledDefaultTrue
                        ? " (Switch to uncontrolled)"
                        : " (It's now uncontrolled)"}
                </OnClickText>
                <MyButtonWithStateDisplay
                    state={isControlledDefaultTrue ? currentState : undefined}
                    onChange={handleChange}
                />
            </div>
            <div style={{ margin: "10px" }}>
                <SmallSpan>
                    Example 2: Trigger warning from uncontrolled to controlled.
                </SmallSpan>
                <OnClickText
                    style={{ fontSize: "12px" }}
                    disabled={isControlledDefaultFalse}
                    onClick={() => setIsControlledDefaultFalse(true)}
                >
                    {isControlledDefaultFalse
                        ? " (It's now controlled)"
                        : " (Switch to controlled)"}
                </OnClickText>
                <MyButtonWithStateDisplay
                    state={isControlledDefaultFalse ? currentState : undefined}
                    onChange={handleChange}
                />
            </div>
            <div style={{ margin: "10px" }}>
                <SmallSpan>
                    Example 3: Trigger warning by having a non-readOnly controlled
                    component without and onChange handler.
                </SmallSpan>
                <OnClickText
                    style={{ fontSize: "12px" }}
                    onClick={() => setIsReadOnly(!isReadOnly)}
                >
                    {isReadOnly ? "(Set ReadOnly to false)" : "(Set ReadOnly to true)"}
                </OnClickText>
                <MyButtonWithStateDisplay state={currentState} readOnly={isReadOnly} />
            </div>
        </div>
    )
}
export default App
