## Control Props, I

> Summary: The control props pattern lets the user of a component manage that components state from the outside. Write a very simple button component that implements the bare minimum of this pattern.

Create a very simple component that has a button you can click and also displays its internal state with an initial state of` {count: 0}`. By default, the button increments its count by one when it is clicked. This component should be controllable from the outside, so that the user could control how the state is updated each time the component is clicked.

Say from the outside say you want to use this same button but instead:

1. The counter starts at `{count: 1`}
2. You'd rather double the value at each click.
3. You also want to display: the previous count value, the suggested value, and the count value that would have happened if we weren't controlling this component.
4. You might also want the button to reset when it reaches a particular maximum value.

Here's an example api of how might want to use it. Whenever the state of the component changes, it will pass the `suggestedState` and the `action` that happened. And you can do whatever you want with that information to get the new state which you will pass back to the component.

```jsx
const MAX_VALUE = 512

const App = () => {
    const [currentState, setState] = useState({ count: 1 })

    const handleChange = (suggestedState, action) => {
        if (action.type !== "onClick") {
            throw new Error(
                `This action type ${action.type} is not supposed to be in the API`
            )
        }

        let count = currentState.count * 2 > MAX_VALUE ? 1 : currentState.count * 2

        setState({
            count,
            previousCount: currentState.count,
            suggestedCount: suggestedState.count,
        })
    }

    return (
        <div>
            <h1>UnControlled</h1>
            <MyButtonWithStateDisplay />
            <span>
                Uncontrolled component: Starts count at 0, increments by one on each click
                indefinitely.
            </span>
            <h1>Controlled</h1>
            <MyButtonWithStateDisplay onChange={handleChange} state={currentState} />
            <p>
                Displays the current count. Controlled component: Starts count at 1,
                doubles value on each click until it reaches 512(where it will restart),
                also displays previous count and suggested count.
            </p>
        </div>
    )
}
```

### My Solution

Your component `MyButtonWithStateDisplay` could be using a hook `useMyButtonWithStateDisplay` like this. It uses the prop collections pattern!
The hook is responsible for returning the actual `state` and the props that you should pass to the button given
the optional `onChange` handler and controlled `state` passed to the component if any.

```jsx
const MyButtonWithStateDisplay = ({ onChange, state: controlledState }) => {
    const { state, buttonProps } = useMyButtonWithStateDisplay({
        onChange,
        controlledState,
    })

    return (
        <div>
            <button {...buttonProps}> Click Me! </button>
            {JSON.stringify(state)}
        </div>
    )
}
```

And your `useMyButtonWithStateDisplay` hook may be using a reducer like this:

```jsx
const myButtonWithStateDisplayReducer = (state, action) => {
    if (action.type === "onClick") {
        return { ...state, count: state.count + 1 }
    }

    throw Error(`unhandled action type ${action.type}`)
}
```

What we want the hook to do:

1. The hook should return the new `state` of this component and the `buttonProps` that the component passes to its button. The `buttonProps` contains the props that the button needs, so that the behavior we want will be executed `onClick`.

2. If we don't pass a `controlledState` , `onClick` will do the default behavior. When `controlledState` is passed to it, `onClick` will execute the `onChange` function, by passing the `suggestedChange` (default behavior result) and the `action` that happened to this `onChange` function.

Here's how we could write the hook:

```jsx
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
        }

        throw new Error(
            "If your state is controlled, then you must also supply an onChange handler"
        )
    }

    return {
        state,
        buttonProps: {
            onClick: () => dispatchWithOnChange({ type: "onClick" }),
        },
    }
}
```
