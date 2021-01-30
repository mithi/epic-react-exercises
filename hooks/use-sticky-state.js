import { useState, useEffect } from "react"

function useStickyState(defaultValue, key) {
    const [value, setValue] = useState(defaultValue)

    if (typeof window === "undefined") {
        return [defaultValue, setValue]
    }

    useEffect(() => {
        const stickyValue = window.localStorage.getItem(key)
        if (stickyValue !== null) {
            setValue(JSON.parse(stickyValue))
        }
    }, [key])

    useEffect(() => {
        window.localStorage.setItem(key, JSON.stringify(value))
    }, [key, value])

    return [value, setValue]
}

export default useStickyState
