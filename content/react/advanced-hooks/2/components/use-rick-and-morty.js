import { useEffect, createContext, useContext, useReducer, useCallback } from "react"
import useAsync from "../../1/components/use-async"
import useLocalStorageState from "hooks/use-local-storage"
import { delayedFetchRickAndMorty } from "fetch-utils"

const cacheReducer = (cache, action) => {
    const { type, key, data } = action

    if (type === "CLEAR") {
        return {}
    }

    if (type === "OVERRIDE") {
        if (!data || !key) {
            return cache
        }
        return { ...cache, [key]: data }
    }

    if (type === "REMOVE") {
        if (!cache[key]) {
            return cache
        }
        const newCache = { ...cache }
        delete newCache[key]
        return newCache
    }
    throw new Error(`unhandled action type: ${type} in useCache`)
}

const useCache = localStorageKey => {
    const [localData, setLocalData] = useLocalStorageState(localStorageKey)
    const [cache, dispatch] = useReducer(cacheReducer, localData)
    useEffect(() => setLocalData(cache), [cache, setLocalData])
    return { cache, dispatch }
}

const RickAndMortyCacheContext = createContext()

function RickAndMortyCacheProvider({ children }) {
    const { cache, dispatch } = useCache("rick-and-morty-cache")
    return (
        <RickAndMortyCacheContext.Provider
            value={{ cache, dispatch }}
            {...{ children }}
        />
    )
}

function useRickAndMortyCache() {
    const context = useContext(RickAndMortyCacheContext)
    if (!context) {
        throw new Error(
            "useRickAndMortyCache must be used within a RickAndMortyCacheProvider"
        )
    }
    return context
}

function useRickAndMorty({ key = "", useCacheOnlyWhenNotReloading = false } = {}) {
    const { cache, dispatch: cacheDispatch } = useRickAndMortyCache()

    const {
        data: asyncData,
        status: asyncStatus,
        error: asyncError,
        runFunction,
        reset,
    } = useAsync()

    useEffect(() => {
        reset()
        if (!key) {
            return
        }

        if (!cache[key] && !useCacheOnlyWhenNotReloading) {
            load()
        }
    }, [key, load, cache, useCacheOnlyWhenNotReloading, reset])

    const load = useCallback(() => {
        runFunction(
            delayedFetchRickAndMorty(key).then(data => {
                cacheDispatch({ type: "OVERRIDE", key, data })
                return data
            })
        )
    }, [key, cacheDispatch, runFunction])

    const reload = useCallback(() => {
        cacheDispatch({ type: "REMOVE", key })
        load()
    }, [load, key, cacheDispatch])

    if (!key) {
        return { status: "idle", data: null }
    }

    if (cache[key]) {
        return { data: cache[key], status: "resolved", reload }
    }

    if (useCacheOnlyWhenNotReloading && !cache[key]) {
        return { status: "notInCache" }
    }

    return { status: asyncStatus, data: asyncData, error: asyncError, reload }
}

export { RickAndMortyCacheProvider, useRickAndMortyCache, useRickAndMorty }
