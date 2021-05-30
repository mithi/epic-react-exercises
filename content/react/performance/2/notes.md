## Rules of thumb

1. Code Splitting and lazy loading
2. `useMemo` and `useCallback`
    - [When to useMemo and useCallback](https://kentcdodds.com/blog/usememo-and-usecallback)
3. `React.memo`
4. Windowing technique for rendering large lists
5. [Speed up your app with web workers](https://kentcdodds.com/blog/speed-up-your-app-with-web-workers)
6. [How to optimize your context value](https://kentcdodds.com/blog/how-to-optimize-your-context-value)
7. [Jotai](https://github.com/pmndrs/jotai) and [Recoil](https://github.com/facebookexperimental/Recoil)
8. [Managing React Application State Management - Talk by Kent C. Dodds](https://www.youtube.com/watch?v=zpUMRsAO6-Y)
9. Minimize the number of props passed to a component and the number of states in that component
10. Derive states from other states instead of storing them
11. As much as possible pass props with primitive types such as `strings`, `booleans`, `numbers`, avoid passing objects

```ts
// this doesn't make sense
const SenselessComponent = ({ width, onChildClose }) => (
    <Child
        title="Hello"
        hasFamily={true}
        style={{ width, color: "white" }}
        onClose={() => {
            console.log("I'm closing!")
            onChildClose()
        }}
    />
)

// this one does
const SensibleComponent = ({ width, onChildClose }) => {
    const style = useMemo(() => ({ width, color: "white" }), [width])
    const onClose = useCallback(() => {
        return () => {
            console.log("I'm closing!")
            onChildClose()
        }
    }, [onChildClose])

    return <Child title="Hello" hasFamily={true} {...{ onClose, style }} />
}
```
