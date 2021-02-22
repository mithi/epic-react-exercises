## Prop Collections

> Summary: Use the prop collection pattern to create reusable animated counters that can be applied to and customized for many different use cases. It also helps users not misuse your components

The idea is of prop collections is that to achieve the intended functionality, the hook returns props that are intended to be passed to components.

In this example, I created the hook `useAnimatedCounter` to manage the state of counters with animation functionality.

The four components as demonstrated here (a simple counter, star rating, "medium-clap-like" hearts, progress ring) are all powered by the same hook. Go ahead and click on the the stars, number, heart and progress ring!

This hook is intended to be used on an animating component like below. (This component uses the [Framer Motion](https://www.framer.com/api/motion/examples/) React library, but this is an implementation detail).

```jsx
// key is a prop that is intended to unmount and remount the button
// and upon mounting it will do the animation type as specified
const AnimatedCountButton = ({
    key,
    onClick,
    children,
    animationType,
    ...otherProps
}) => (
    <button {...{ onClick, ...otherProps }} className={styles.noSelect}>
        <motion.div
            animate={
                animationType === "entrance"
                    ? fadeInVariant
                    : animationType === "shake"
                    ? shakeVariant
                    : defaultVariant
            }
            whileHover={hoverVariant}
            whileTap={pressedVariant}
        >
            {children}
        </motion.div>
    </button>
)
```

The `useAnimatedCounter` could take in 4 arguments

1. A minimum value
2. A maximum value
3. An initial value
4. The increment / step size

The `useAnimatedCounter` could return four collections of props. A collection of props for:

1. The reset button
2. The increment button
3. The clickable animating component
4. The display of the count (with built in accessibility features)

It could also return managed and derived states such as

1. Which animation type to display (the animation on `reset`, on `increment` or on `no operation` because the value is above the intended maximum value)
2. Number of times the buttons have been clicked
3. Whether the counter is at the starting position or not
4. Where the counter is at the end / maximum position or not
5. How far the count is to the maximum possible value ( a fraction from zero to one)

Here's a possible API for the hook

```jsx
const {
    state,
    countProps,
    countButtonProps,
    resetButtonProps,
    animatedButtonProps,
} = useAnimatedCounter({
    minCount: 0,
    initialCount: 1,
    maxCount: 10,
    step: 2,
})

const {
    count,
    atEndPosition,
    animationType,
    atStartPosition,
    eventCount,
    progressFraction,
    minCount,
    maxCount,
    initialCount,
    step,
} = state
```

And you can spread the prop collections to your own components like this

```jsx
    <AnimatedCountButton {...animatedButtonProps}>
        This block will animate each time the following conditions are met: (1) The reset
        button was clicked (2) The counter button was clicked (3) I am clicked. There are
        three possible animations that I might do.
    </AnimatedCountButton>
    {/* the prop bellow will display the count, with appropriate accessibility props*/}
    <span {...countProps} />

    <button {...resetButtonProps}>Click me to reset the counter</button>
    <button {...countButtonProps}>Click me to increment the counter</button>
```

## My solution

Here's the hook

```jsx
const useAnimatedCounter = ({
    maxCount = 10,
    minCount = 0,
    step = 1,
    initialCount,
} = {}) => {
    const [count, setCount] = useState(initialCount || minCount)
    const [eventCount, setEventCount] = useState(0)

    if (maxCount < 0 || minCount < 0 || step < 0 || initialCount < 0) {
        throw new Error(
            "maxCount, minCount, step, and initialCount must be a positive number"
        )
    }

    const onClick = () => {
        setEventCount(eventCount + 1)
        const nextCount = count + step
        if (nextCount > maxCount) {
            return
        }
        setCount(nextCount)
    }

    const animationType =
        count === minCount ? "entrance" : count + step > maxCount ? "shake" : "default"

    const atEndPosition = count + step > maxCount || count >= maxCount
    const atStartPosition = count === minCount
    const progressFraction = count / (maxCount - minCount)

    return {
        countProps: {
            "aria-valuemax": maxCount,
            "aria-valuemin": minCount,
            "aria-valuenow": count,
            "children": count,
            "title": count,
        },
        countButtonProps: {
            "aria-pressed": !atStart,
            "disabled": atEndPosition,
            "title": `increment count by ${step}`,
            "aria-label": `increment count by ${step}`,
            onClick,
        },
        resetButtonProps: {
            disabled: atStart,
            title: "reset count",
            onClick: () => {
                setEventCount(eventCount + 1)
                setCount(minCount)
            },
        },
        animatedButtonProps: {
            key: eventCount,
            animationType,
            onClick,
        },
        state: {
            atEndPosition,
            animationType,
            atEndPosition
            eventCount,
            progressFraction,
            count,
            initialCount,
            minCount,
            maxCount,
            step,
        },
    }
}
```

The simple counter

```jsx
<DivBg1>
    <div>
        <AnimatedCountButton {...animatedButtonProps}>
            <span {...countProps} />
        </AnimatedCountButton>
        <div>
            <SquareButton {...resetButtonProps}>
                <BiRefresh />
            </SquareButton>

            <SquareButton {...countButtonProps}>
                <FaPlusCircle />
            </SquareButton>
        </div>
    </div>

    <div>
        <li>min: {minCount}</li>
        <li>max: {maxCount}</li>
        <li>step: {step}</li>
        <li>initial: {initialCount}</li>
        <li>current: {count}</li>
        <li>
            position:
            {atEndPosition ? "end" : atStartPosition ? "start" : "between"}
        </li>
        <li>motion: {animationType}</li>
        <li>event: {eventCount}</li>
        <li>progress: {progressFraction}</li>
        <li>
            <OnClickText {...countButtonProps} disabled={false}>
                Try incrementing
            </OnClickText>
        </li>
        <li>
            <OnClickText {...resetButtonProps} disabled={false}>
                Try resetting
            </OnClickText>
        </li>
    </div>
</DivBg1>
```

The heart

```jsx
const Example = () => {
    const {
        state,
        countProps,
        resetButtonProps,
        animatedButtonProps,
    } = useAnimatedCounter({
        minCount: 0,
        step: 1,
        maxCount: 20,
        initialCount: 16,
    })

    const { atStartPosition, atEndPosition } = state
    return (
        <DivBg1>
            <PrettyHeader {...countProps} />
            <AnimatedCountButton
                {...animatedButtonProps}
                style={{
                    color: atStartPosition ? "gray" : atEndPosition ? "red" : "pink",
                }}
            >
                <FaHeart />
            </AnimatedCountButton>

            {!atStartPosition && (
                <SquareButton {...resetButtonProps}>
                    <ImCross />
                </SquareButton>
            )}
        </DivBg1>
    )
}
```

The star rating

```jsx
const Example = () => {
    const {
        state,
        resetButtonProps,
        countButtonProps,
        animatedButtonProps,
    } = useAnimatedCounter({
        minCount: 0,
        step: 1,
        maxCount: 5,
        initialCount: 3,
    })

    const { atEndPosition, count, progressFraction } = state
    return (
        <DivBg1>
            {atEndPosition ? (
                <SquareButton {...resetButtonProps}>
                    <ImCross />
                </SquareButton>
            ) : (
                <SquareButton {...countButtonProps}>
                    <FaRegStar />
                </SquareButton>
            )}

            <AnimatedCountButton {...animatedButtonProps}>
                <div>
                    {Array(count)
                        .fill(null)
                        .map((_, key) => {
                            return (
                                <SquareButton
                                    disabled={true}
                                    key={key}
                                    onClick={() => {}}
                                    style={opacity: progressFraction}}
                                >
                                    <FaStar />
                                </SquareButton>
                            )
                        })}
                </div>
            </AnimatedCountButton>
        </DivBg1>
    )
}
```

The progress ring

```jsx
const size = 70
const strokeWidth = 10
const center = size / 2
const radius = size / 2 - strokeWidth / 2
const circumference = 2 * Math.PI * radius

const Example = () => {
    const { primaryColor } = useTheme()
    const {
        state,
        countButtonProps,
        resetButtonProps,
        animatedButtonProps,
    } = useAnimatedCounter({
        minCount: 0,
        initialCount: 65,
        maxCount: 100,
        step: 5,
    })

    const { atEndPosition, progressFraction } = state
    const offset = progressFraction * circumference

    return (
        <DivBg1>
            <AnimatedCountButton {...animatedButtonProps}>
                <svg className="svg" width={size} height={size}>
                    <circle
                        className={styles.svgCircleBg}
                        stroke={primaryColor}
                        cx={center}
                        cy={center}
                        r={atEndPosition ? 1 : radius}
                        strokeWidth={atEndPosition ? size - strokeWidth : strokeWidth}
                    />
                    <circle
                        className={styles.svgCircle}
                        stroke={"gray"}
                        cx={center}
                        cy={center}
                        r={radius}
                        strokeWidth={strokeWidth}
                        strokeDasharray={circumference}
                        strokeDashoffset={offset}
                    />
                    <text
                        className={styles.svgCircleText}
                        x={center}
                        y={center}
                        stroke={primaryColor}
                    >
                        {(progressFraction * 100).toString().slice(0, 2)}%
                    </text>
                </svg>
            </AnimatedCountButton>
            <div>
                <SquareButton {...resetButtonProps}>
                    <BiRefresh />
                </SquareButton>
                <SquareButton {...countButtonProps}>
                    <FaPlusCircle />
                </SquareButton>
            </div>
        </DivBg1>
    )
}
```
