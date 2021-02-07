## Additional Notes

1. [Kent's Should I `useState` or `useReducer`?](https://kentcdodds.com/blog/should-i-usestate-or-usereducer)
2. [Kent's How to implement `useState` with `useReducer`](https://kentcdodds.com/blog/how-to-implement-usestate-with-usereducer)
3. [`useTypescript` — A Complete Guide to React Hooks and TypeScript](https://levelup.gitconnected.com/usetypescript-a-complete-guide-to-react-hooks-and-typescript-db1858d1fb9c) by Trey Huffine
4. [Kent's When to `useMemo` and `useCallback`](https://kentcdodds.com/blog/usememo-and-usecallback)
5. [Memoization and React](https://epicreact.dev/memoization-and-react/)
6. [What the Fork is Closure](https://whatthefork.is/closure)
7. [Lifting state up](https://reactjs.org/docs/lifting-state-up.html)
8. [Michael Jackson Tweet: Composition](https://twitter.com/mjackson/status/1195495535483817984)
9. [Kent's `useEffect` vs `useLayoutEffect`](https://kentcdodds.com/blog/useeffect-vs-uselayouteffect)
10. [React docs: hook reference](https://reactjs.org/docs/hooks-reference.html)
11. [[ESLint] Feedback for 'exhaustive-deps' lint rule #14920](https://github.com/facebook/react/issues/14920)
12. [Gupta Garuda: React Hooks - Understanding Component Re-renders](https://medium.com/@guptagaruda/react-hooks-understanding-component-re-renders-9708ddee9928)
13. [StackOverFlow: When to use `useImperativeHandle`](https://stackoverflow.com/questions/57005663/when-to-use-useimperativehandle-uselayouteffect-and-usedebugvalue)

## Things you should know

1. How to do lazy initialization with `useReducer` and `useState`
2. Abortable fetch
3. Is `setState` from `useState` and `dispatch` from `useReducer` guaranteed to be stable? What does that mean?
4. What does it mean when the React docs say: "You may rely on `useMemo` as a performance optimization, not as a semantic guarantee."
5. How does [`Object.is` comparison algorithm](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is#description) work?
6. React docs says "we recommend starting with `useEffect` first and only trying `useLayoutEffect` if that causes a problem"

## Hooks you can try to implement from scratch

1. From [`streamich/react-use`](https://github.com/streamich/react-use)
    - [`useAsync`](https://github.com/streamich/react-use/blob/master/docs/useAsync.md)
    - [`useAsyncRetry`](https://github.com/streamich/react-use/blob/master/docs/useAsyncRetry.md)
    - `useAsyncFn`
    - [`useLocalStorage`](https://github.com/streamich/react-use/blob/master/docs/useLocalStorage.md)
    - [`useMount`](https://github.com/streamich/react-use/blob/master/docs/useMount.md)
    - [`useMountedState`](https://github.com/streamich/react-use/blob/master/docs/useMountedState.md)
    - `UseUnmount`
    - `UseLifecycle`
    - `UseIsomorphicLayoutEffect`
2. From [Gabe Ragland: `useHooks`](https://usehooks.com/)
    - [`useKonamiCode`](https://usehooks.com/useKonamiCode/)
    - [`useToggle`](https://usehooks.com/useToggle/)
    - `useMemoCompare`
    - `useEventListener`
    - `useWhyYouDidUpdate`
    - `useMedia`
    - `useTheme`
    - `useHistory`
    - `usePrevious`
