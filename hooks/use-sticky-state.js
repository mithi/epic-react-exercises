import { useState, useEffect } from "react"

function useStickyState(defaultValue, key) {
    const [value, setValue] = useState(defaultValue)

    useEffect(() => {
        if (typeof window === "undefined") {
            return
        }

        const stickyValue = window.localStorage.getItem(key)
        if (stickyValue !== null) {
            setValue(JSON.parse(stickyValue))
        }
    }, [key])

    useEffect(() => {
        if (typeof window === "undefined") {
            return
        }

        window.localStorage.setItem(key, JSON.stringify(value))
    }, [key, value])

    return [value, setValue]
}

export default useStickyState
