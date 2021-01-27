## Additional Notes

1.  [Why React hooks?](https://www.youtube.com/watch?v=zWsZcBiwgVE&list=PLV5CVI1eNcJgNqzNwcs4UKrlJdhfDjshf)

    -   35 minute talk by Kent C Dodds

2.  What are React hooks?

    -   Special functions that can store data (like state) or perform functions (side effects) among other things [(Read Official React Docs)](https://reactjs.org/docs/hooks-intro.html)
    -   Can only be called inside react function component or other hooks. Name must start with `use`.
    -   Common hooks: `useState`, `useEffect`, `useLayoutEffect`, `useRef`, `useContext`, `useReducer`, `useCallback`, `useMemo`

3.  [Hooks flow diagram](https://github.com/donavon/hook-flow)

    -   A diagram that shows when different hooks are called and the order in which they’re called (from Donavon)
    -   [Slight changes after React 17](https://github.com/kentcdodds/react-hooks/issues/90)

4.  [Lift the state up](https://reactjs.org/docs/lifting-state-up.html)

    -   Technique to share code between two sibling components (from React Docs)

5.  State Colocation

    -   It means to put your state as close as possible to where it's being used
    -   Kent C Dodds: [State Colocation will make your React app faster](https://kentcdodds.com/blog/state-colocation-will-make-your-react-app-faster)
    -   [Colocation](https://kentcdodds.com/blog/colocation)
    -   One of the leading causes to slow React applications is global state, especially the rapidly changing variety.

6.  [Don't sync states, derive it!](https://kentcdodds.com/blog/dont-sync-state-derive-it)

    -   It's usually better to calculate states (deriving) based on other states when you can as opposed to storing them (from Kent C Dodds Blog)

## You should know these things

-   What is an [error boundary](https://reactjs.org/docs/error-boundaries.html) and what is it for?
-   Can you do something like `useEffect(async () => await doSomething())` ? Why or why not? If not, what should we do instead?
-   [Does React batch state update functions when using hooks?](https://stackoverflow.com/questions/53048495/does-react-batch-state-update-functions-when-using-hooks). Is the behavior the same for Promise calls? [Could this change in the future](https://stackoverflow.com/questions/53048495/does-react-batch-state-update-functions-when-using-hooks)?
-   Why did Kent say [Stop Using `isLoading` booleans](https://kentcdodds.com/blog/stop-using-isloading-booleans)?
-   What is the difference between `fetch().then(result => result, error => error)` and `fetch().then(result => result).catch(error => error)` ?
-   [Public Class Fields with React Components](https://egghead.io/lessons/javascript-public-class-fields-with-react-components)
-   The npm package [bvaughn/react-error-boundary](https://github.com/bvaughn/react-error-boundary)
