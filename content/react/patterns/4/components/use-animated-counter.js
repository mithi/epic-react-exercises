import { useState } from "react"

/*

callAll takes an arbitrary number of functions as arguments, and returns a
function that does the takes an arbitrary number of arguments, and for each function, calls that function
    with those arguments.

Example:

const callAll = (...fns) => (...args) => fns.forEach(fn => fn && fn(...args))

const add = (x, y) => console.log(`${x} + ${y} =`, x + y )
const multiply = (x, y) =>console.log(`${x} * ${y} =`, x * y )
const divide = (x, y) =>console.log(`${x} / ${y} =`, x / y )
const subtract = (x, y) =>console.log(`${x} - ${y} =`, x - y )

const callAllArithmeticOperations = callAll(add, multiply, divide, subtract)
callAllArithmeticOperations2(5, 3, 2)

5 + 3 = 8
5 * 3 = 15
5 / 3 = 1.6666666666666667
5 - 3 = 2

*/
const callAll = (...fns) => (...args) => fns.forEach(fn => fn && fn(...args))

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

    const onClickDefault = () => {
        setEventCount(eventCount + 1)
        const nextCount = count + step
        if (nextCount > maxCount) {
            return
        }
        setCount(nextCount)
    }

    const reset = () => {
        setEventCount(eventCount + 1)
        setCount(minCount)
    }

    const getCountButtonProps = ({ onClick, ...props } = {}) => {
        return {
            "onClick": callAll(onClickDefault, onClick),
            "aria-pressed": !atStartPosition,
            "disabled": atEndPosition,
            "title": `increment count by ${step}`,
            "aria-label": `increment count by ${step}`,
            ...props,
        }
    }

    const getResetButtonProps = ({ onClick, ...props } = {}) => {
        return {
            onClick: callAll(reset, onClick),
            disabled: atStartPosition,
            title: "reset count",
            ...props,
        }
    }

    const getAnimatedButtonProps = ({ onClick, ...props } = {}) => {
        return {
            key: eventCount,
            animationType,
            onClick: callAll(onClickDefault, onClick),
            ...props,
        }
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
        getCountButtonProps,
        getResetButtonProps,
        getAnimatedButtonProps,
        state: {
            atStartPosition,
            animationType,
            atEndPosition,
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

export default useAnimatedCounter
