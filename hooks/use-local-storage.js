import { useState, useEffect, useRef } from "react"

function useLocalStorageState(
    key,
    defaultValue = "",
    { serialize = JSON.stringify, deserialize = JSON.parse } = {}
) {
    const [state, setState] = useState(() => {
        if (typeof window === "undefined") {
            return typeof defaultValue === "function" ? defaultValue() : defaultValue
        }
        const valueInLocalStorage = window.localStorage.getItem(key)
        if (valueInLocalStorage) {
            // the try/catch is here in case the localStorage value was set before

            try {
                return deserialize(valueInLocalStorage)
            } catch (error) {
                window.localStorage.removeItem(key)
            }
        }
        return typeof defaultValue === "function" ? defaultValue() : defaultValue
    })

    const prevKeyRef = useRef(key)

    useEffect(() => {
        const prevKey = prevKeyRef.current
        if (prevKey !== key) {
            window.localStorage.removeItem(prevKey)
        }
        prevKeyRef.current = key
        window.localStorage.setItem(key, serialize(state))
    }, [key, state, serialize])

    return [state, setState]
}

export default useLocalStorageState
