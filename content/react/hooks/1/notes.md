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

7.  DOM interactions

    -   Use `useRef`, `useEffect`
    -   `<div></div>` is just a syntactic sugar for `React.createElement()`, dom nodes are not created at all until `ReactDom.render()` is called.
    -   The `render` method has no access to the dom node by itself, it only creates and returns react elements
    -   To access the dom, use a special prop called `ref`
    -   A component that has rendered is is said to be `mounted`. That's when `useEffect` callback is called, by that point`ref.current` set to the dom node which you can directly do interactions, manipulations

8.  HTTP Requests

    -   IMPORTANT: React batches state updates (`setState`)
    -   [Does React batch state update functions when using hooks?](https://stackoverflow.com/questions/53048495/does-react-batch-state-update-functions-when-using-hooks) (StackOverflow #53048495)
    -   If the state changes are triggered asynchronously (like wrapped in a promise), they will not be batched; if they are triggered directly, they will be batched.

9.  Kent C Dodds: [Stop Using `isLoading` booleans](https://kentcdodds.com/blog/stop-using-isloading-booleans)

## Exercises

1. [TicTacToe](https://react-hooks.netlify.app/4)

    - Note: Derive most states instead of storing them
    - Use local storage and custom hooks; do NOT use class components
    - Be able to pause a game, close the tab, and then resume the game later
    - Be able to keep a history of the game; allow players to go backward and forward in time

2. [Vanilla tilt](https://react-hooks.netlify.app/5)

    - Use `useRef` with [micku7zu/vanilla-tilt.js](https://micku7zu.github.io/vanilla-tilt.js/)

3. [Fetch Pokemons ](https://react-hooks.netlify.app/6)
    - A form where users can enter the pokemon name and your app fetches that pokemon's data; show errors if any
    - Use status states (strings), do NOT derive from existing state or booleans. Show the following: `idle` no request made yet, `pending` request started, `resolved` request successful, `rejected` request
    - Use ONE state object ie `setState({status: 'resolved', pokemon})`, instead of several states (can you store this and use localStorage in a custom hook?), you can also try using `useReducer` instead of `useState`
    - Create an `ErrorBoundary` class component to handle errors the correct way.
    - Try using built-in `react-error-boundary` the right way; use `resetKeys` for better user experience
