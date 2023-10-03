import { useRef, useEffect, useLayoutEffect, useCallback, useReducer } from "react"

/*
    Sometimes, a user clicks an button that will
    fetch something which takes some time, and then
    before that something is fetched, the user could
    navigate out of that component, which unmounts
    that component. The problem is that this can lead
    to memory leaks.

    useSafeDispatch is a hook we can use to prevent
    this from happening.

    The useSafeDispatch takes a dispatch function
    and returns a function that guarantees that
    the dispatch function (which contains the fetch function)
    will not be called when the component is no longer mounted

    The trick is that we have an a reference that
    that keeps track where a component is mounted or not.

    If it is not mounted then the (safe) dispatch function
    will not do anything.

    If we don't use a safeDispatchFunction we could get this warning:

    Warning: Can't perform a React state update on an unmounted component.
    This is a no-op, but it indicates a memory leak in your application.
    To fix, cancel all subscriptions and asynchronous tasks in a useEffect cleanup function.

    BOTTOMLINE:
        useSafeDispatch takes an unsafeDispatchFunction and returns
        a safeDispatchFunction

        The unsafeDispatchFunction is unsafe because it will run regardless
        of whether or not the component is mounted
 */
const useSafeDispatch = unsafeDispatchFunction => {
    const isMountedRef = useRef(false)

    // on the server side, we cannot call useLayoutEffect
    // so make sure to call it only when on the client
    const useNextEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect

    // why use layout effect ?
    // this effect is called before the component is
    // shown on the screen, while use effect is called after
    // in our case:
    // we would want to switch (or ignore updates) as quickly as possible
    useNextEffect(() => {
        isMountedRef.current = true
        return () => (isMountedRef.current = false)
    })

    const safeDispatchFunction = useCallback(
        (...args) => {
            isMountedRef.current ? unsafeDispatchFunction(...args) : void 0
        },
        [unsafeDispatchFunction]
    )

    return safeDispatchFunction
}

/*
    asyncReducer is a private function that is only
    available to useAsync, and useAsync is something we control
    so we know that it will not be incorrectly used

    idle or pending: { data: null, error: null }
    rejected: { data: null, error }
    resolved: { data, error: null}

    WARNING: Be careful with this, you might want to write
    an asyncReducer that is more explicit IE like this one:
    https://github.com/kentcdodds/advanced-react-hooks/blob/a449a2119e0b8ea9d90065cc80a00e68a6d4db8b/src/final/02.extra-3.js#L33
 */
const asyncReducer = (_, nextState) => nextState

/*
    The useAsync is a hook that optionally takes an initial state
    and returns { status, data, error, runFunction}

    The state is just { status, data, error}

    The runFunction is a function that accepts a promise
    and runs a dispatch function to update the state { status, data, error }

    This promise is assumed to be returned by the function you want to run
    such as a fetch function:
        So you call it like this: runFunction(fetchSomething(...))
        where fetchSomething(...) returns a promise

    This dispatch function is safe, meaning that it will not
    run if the component that called it is unmounted
 */
const useSafeAsync = initialState => {
    const [state, unsafeDispatch] = useReducer(asyncReducer, {
        status: "idle",
        data: null,
        error: null,
        ...initialState,
    })

    let dispatch = useSafeDispatch(unsafeDispatch)
    // if you uncomment the line below, this will be an unsafeDispatch
    // dispatch = unsafeDispatch

    const { data, error, status } = state

    const runFunction = useCallback(
        promise => {
            dispatch({ status: "pending" })
            promise.then(
                data => dispatch({ status: "resolved", data, error: null }),
                error => dispatch({ status: "rejected", error, data: null })
            )
        },
        [dispatch]
    )

    const reset = useCallback(() => dispatch({ status: "idle" }), [dispatch])

    return { error, status, data, runFunction, reset }
}

export default useSafeAsync
