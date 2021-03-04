## Control Props, II

> Summary: Create a similar rating component as that of [Material UI](https://material-ui.com/components/rating/) using the Control Props pattern. It's okay if it's a different API and that you don't handle half star ratings.

Once you have made the rating component, instantiate two of them. They should be in sync with each other like in the accompanying demonstration.
The two components have a maximum score of five and ten respectively, say they're called `rating5` and `rating10`. The component with 10 components, can only have even ratings (`2`, `4`, `6`, `8`, `10`). When one of the events occur in the component (`mouseEnter`, `mouseOut`, or `onClick`), the other component makes a similar update in its state.
In other words, when `rating5` has a rating of `3`, `rating10` has a rating of `6`, always twice that of `rating5`. If the icon corresponding to `5` of `rating 10` is clicked,
the rating would be `6`. The specific icon corresponding to the rating should be different from the rest.

Just a heads up: The logic to achieve this functionality can be very tricky... It has a lot of edge cases! Let me know if I missed something!

### My Solution

You could call the uncontrolled component like this:

```jsx
<Rating
    style={{ ...RATING_STYLE, height: "40px" }}
    iconFilled={filledHeart}
    iconDefault={defaultHeart}
    iconHover={hoverHeart}
    iconActive={activeHeart}
    maxRating={NUMBER_OF_HEARTS}
    name={"uncontrolled"}
/>
```

And the controlled version like this:

```jsx
<Rating
    style={RATING_STYLE}
    iconFilled={darkOrangeStar}
    iconDefault={greyStar}
    iconHover={orangeStar}
    iconActive={orangeStarBigger}
    maxRating={NUMBER_OF_STARS}
    onChange={handleStarRatingChange}
    state={starState}
    name={NAME.star}
/>
```

Here's an example of icons you can pass

```jsx
const darkOrangeStar = (
    <span style={{ fontSize: "50px", color: "#e17055" }}>
        <FaStar />
    </span>
)

const orangeStar = (
    <span style={{ fontSize: "50px", color: "orange" }}>
        <FaStar />
    </span>
)

const orangeStarBigger = (
    <span style={{ fontSize: "60px", color: "orange" }}>
        <FaStar />
    </span>
)

const greyStar = (
    <span style={{ fontSize: "50px", color: "grey" }}>
        <FaRegStar />
    </span>
)

const defaultHeart = (
    <span style={{ fontSize: "30px", color: "grey" }}>
        <FaRegHeart />
    </span>
)
const activeHeart = (
    <span style={{ fontSize: "30px", color: "#fd79a8" }}>
        <FaHeartBroken />
    </span>
)

const hoverHeart = (
    <span style={{ fontSize: "30px", color: "#fd79a8" }}>
        <FaHeartbeat />
    </span>
)

const filledHeart = (
    <span style={{ fontSize: "30px", color: "#e84393" }}>
        <FaHeart />
    </span>
)
```

For simplicity, the `state` of the component could be composed only three things.

1. The `rating` (A positive integer from `0` to `maxRating`),
2. the `hoverIndex` (`null` or a positive integer from `0` to `maxRating - 1` ), `null` when nothing is hovered, `0` when the first rating icon is `hovered`, and `maxRating - 1` when the last rating icon is hovered
3. The `lastEvent` recorded that resulted the current `rating` and `hover`.

```jsx
{ rating: 0, hoverIndex: null, lastEvent: actionTypes.mouseLeave }
```

The `lastEvent` could have 4 possible event types

```jsx
const eventTypes = {
    hover: "hover",
    mouseLeave: "mouseLeave",
    removeRating: "removeRating",
    setRating: "setRating",
}
```

And the `actionTypes` possible could be just one of two.
If an icon was clicked (`eventType = "rate"`) or if there was either a `mouseEnter` or `mouseLeave` (`eventType ="hover"`)
examples of an action could be

1. `action = { type: "rate", rating: 3}` indicating the 3rd icon was clicked
2. `action = {type: "hover", hoverIndex: 2}` indicating the pointer entered the 3rd icon
3. `action = { type: "hover", hoverIndex: null}` indicating the pointer left the icon it was currently pointing to

```jsx
const actionTypes = { rate: "rate", hover: "hover" }
```

Here's the default reducer logic which is essentially:

1. If the user clicks ("rate") an icon, the rating toggle between `0` and the `rating` corresponding to the clicked icon.
2. If the event is a `hover`, if the `hoverIndex` is `null` then the `eventType` is `mouseLeave`, if it's a number, then the `eventType` is `mouseEnter`

```jsx
const ratingReducer = (previous, action) => {
    if (action.type === actionTypes.rate) {
        const willReset = previous.rating === action.rating
        const rating = willReset ? 0 : action.rating
        const lastEvent =
            willReset && previous.rating ? eventTypes.removeRating : eventTypes.setRating

        return { ...previous, rating, lastEvent }
    }

    if (action.type === actionTypes.hover) {
        const lastEvent =
            action.hoverIndex === null ? eventTypes.mouseLeave : eventTypes.hover

        return { ...previous, hoverIndex: action.hoverIndex, lastEvent }
    }

    throw new Error(`Unsupported type: ${action.type}`)
}
```

Here's the `useRating` hook which is pretty self explanatory, following the Control Props pattern.
It has two responsibilities:

1. It is responsible for determining and storing the state of the `Rating` component.
2. It also returns `getButtonProps` which are the props that we should pass to each button of the rating component.

```jsx
const useRating = ({ onChange, controlledState, maxRating } = {}) => {
    const { current: initialState } = useRef({
        rating: 0,
        hoverIndex: null,
        lastEvent: actionTypes.mouseLeave,
    })
    const [stateFromReducer, dispatch] = useReducer(ratingReducer, initialState)

    const stateIsControlled = controlledState !== undefined
    const state = stateIsControlled ? controlledState : stateFromReducer

    const dispatchWithOnChange = action => {
        if (!stateIsControlled) {
            dispatch(action)
            return
        }

        if (onChange) {
            const suggestedState = ratingReducer(state, action)
            onChange(suggestedState, action)
            return
        }

        throw new Error(
            "If your state is controlled, then you must also supply an onChange handler"
        )
    }

    const rate = newRating => {
        dispatchWithOnChange({ type: actionTypes.rate, rating: newRating })
    }
    const hover = hoverIndex => {
        dispatchWithOnChange({ type: actionTypes.hover, hoverIndex })
    }

    const getButtonProps = ({ index, ...otherProps }) => {
        return {
            "onClick": () => rate(index + 1),
            "onMouseEnter": () => hover(index),
            "onMouseLeave": () => hover(null),
            "aria-valuemax": maxRating,
            "aria-valuemin": 0,
            "aria-valuenow": state.rating,
            "title": `change rating to: ${index + 1}`,
            index,
            ...otherProps,
        }
    }

    return { getButtonProps, state }
}
```

We could have a helper function to check if the `lastEvent` was an `onClick`

```jsx
const wasRated = event => [eventTypes.setRating, eventTypes.removeRating].includes(event)
```

Here's the main logic of the action `Rating` component. Essentially, based on the state from the `useRating` hook, it's responsible for determining which icons should be displayed.

```jsx
const Rating = ({
    iconDefault,
    iconFilled,
    iconHover,
    iconActive,
    maxRating = 5,
    state: controlledState,
    onChange,
    style,
    name,
} = {}) => {
    const { state, getButtonProps } = useRating({
        onChange,
        controlledState,
        maxRating,
    })

    const possibleIcons = {
        [iconTypes.default]: iconDefault,
        [iconTypes.hover]: iconHover,
        [iconTypes.active]: iconActive,
        [iconTypes.filled]: iconFilled,
    }

    const ratingElements = Array(maxRating)
        .fill(null)
        .map((_, key) => {
            const moreProps = getButtonProps({
                index: key,
                style: { listStyleType: "none" },
            })

            const iconState = getIconState(key, state)
            return (
                <li key={key} {...moreProps}>
                    {possibleIcons[iconState]}
                </li>
            )
        })

    return (
        <ul {...{ style: { margin: 0, padding: 0, ...style }, name }}>
            {ratingElements}
        </ul>
    )
}
```

Here's the logic to determine the which icon to display for each button (It's a bit tricky)

```jsx
const iconTypes = {
    default: "default",
    hover: "hover",
    filled: "filled",
    active: "active",
}

const getIconState = (key, state) => {
    if (state.rating === 0 && wasRated(state.lastEvent)) {
        return iconTypes.default
    }

    if (key < state.hoverIndex && !wasRated(state.lastEvent)) {
        return iconTypes.hover
    }

    if (key <= state.hoverIndex && wasRated(state.lastEvent)) {
        return iconTypes.filled
    }

    if (key === state.hoverIndex && !wasRated(state.lastEvent)) {
        return iconTypes.active
    }

    if (state.hoverIndex === null && key < state.rating) {
        return iconTypes.filled
    }

    return iconTypes.default
}
```

Here's the main logic of the top level app that renders two `Rating` components. The app makes sure the two controlled rating components are synchronized

```jsx
const NUMBER_OF_STARS = 5
const HEART_MULTIPLIER = 2
const NUMBER_OF_HEARTS = NUMBER_OF_STARS * HEART_MULTIPLIER
const NAME = { heart: "heart", star: "star" }


const App = () => {
    const [syncInfo, setSyncInfo] = useState({
        action: { component: NAME.heart, type: null, hoverIndex: null, rating: 0 },
        state: { rating: 0, hoverIndex: null, lastEvent: actionTypes.mouseLeave },
    })

    function handleStarRatingChange(suggestedState, action) {
        const next = getSyncInfoFromStar(suggestedState, action)
        setSyncInfo(next)
    }

    function handleHeartRatingChange(suggestedState, action) {
        const next = getSyncInfoFromHeart(suggestedState, action, syncInfo.state.rating)
        setSyncInfo(next)
    }

    const starState = getStarStateFromHeart(syncInfo.state)

    return (
        <div>
            <span>
                STATE (heart): {JSON.stringify(syncInfo.state, null, 2)}
                LAST ACTION: {JSON.stringify(syncInfo.action, null, 2)}
            </span>
            <Rating
                style={{ ...RATING_STYLE, height: "40px", marginTop: "10px" }}
                iconFilled={filledHeart}
                iconDefault={defaultHeart}
                iconHover={hoverHeart}
                iconActive={activeHeart}
                maxRating={NUMBER_OF_HEARTS}
                onChange={handleHeartRatingChange}
                state={syncInfo.state}
                name={NAME.heart}
            />
            <Rating
                style={RATING_STYLE}
                iconFilled={darkOrangeStar}
                iconDefault={greyStar}
                iconHover={orangeStar}
                iconActive={orangeStarBigger}
                maxRating={NUMBER_OF_STARS}
                onChange={handleStarRatingChange}
                state={starState}
                name={NAME.star}
            />
    )
}
```

Here's the main logic (this one is very tricky, the the somewhat confusing, I get confused myself), this is the logic for the component with a rating of `10` (heart)

```jsx
const getSyncInfoFromHeart = (suggestedState, action, previousRating) => {
    const newRating = suggestedState.rating
    const isEven = newRating % 2 === 0
    const evenRating = isEven ? newRating : newRating + 1
    action = { component: NAME.heart, ...action }

    if (action.type === actionTypes.rate) {
        if (!isEven && previousRating === evenRating) {
            return {
                state: {
                    rating: 0,
                    lastEvent: actionTypes.removeRating,
                    hoverIndex: null,
                },
                action,
            }
        } else {
            return {
                state: { ...suggestedState, rating: evenRating },
                action,
            }
        }
    }

    if (action.type === actionTypes.hover) {
        const newHoverIndex = suggestedState.hoverIndex
        const evenHoverIndex =
            newHoverIndex === null
                ? null
                : newHoverIndex % 2 === 0
                ? newHoverIndex + 1
                : newHoverIndex

        return {
            state: { ...suggestedState, rating: evenRating, hoverIndex: evenHoverIndex },
            action,
        }
    }

    throw new Error(`Unsupported actionType: ${action.type}`)
}
```

The logic for the helper functions for the component with the rating of five

```jsx
const getSyncInfoFromStar = (suggestedState, action) => {
    const hoverIndex =
        suggestedState.hoverIndex === null
            ? null
            : suggestedState.hoverIndex * HEART_MULTIPLIER + 1

    return {
        state: {
            ...suggestedState,
            rating: suggestedState.rating * HEART_MULTIPLIER,
            hoverIndex,
        },
        action: { component: NAME.star, ...action },
    }
}

const getStarStateFromHeart = heartState => {
    return {
        ...heartState,
        rating: Math.floor(heartState.rating / HEART_MULTIPLIER),
        hoverIndex:
            heartState.hoverIndex !== null
                ? Math.floor(heartState.hoverIndex / HEART_MULTIPLIER)
                : null,
    }
}
```

That's all!
