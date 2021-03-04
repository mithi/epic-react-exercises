## Flexible Compound Components

> Summary: create an accordion component (with subcomponents) that has a great API / syntax. The component styles should be fully customizable by those who'll use them.

Create flexible compound components for an "accordion functionality". You should be able to use the components like this:

```jsx
<Accord>
    <AccordItem>
        <AccordBtnOpen>
            Click me to open the first panel, you will not see me when the panel is open
        </AccordBtnOpen>
        <AccordBtnClose>
            Click me to close the first panel, you will not see me when the panel is
            closed
        </AccordBtnClose>
        <AccordPanel> I am the contents of the first panel </AccordPanel>
    </AccordItem>
    <AccordItem>
        <div>
            <AccordPanel>I am the contents of the second panel!</AccordPanel>
        </div>
        <AccordBtn Component={ColoredButton} style={{ margin: "5px" }}>
            Click me to toggle the second second panel, the panel will appear at the top
            of this button if open
        </AccordBtn>
    </AccordItem>
</Accord>
```

For simplicity, do not allow any other component as a direct child of the `Accord` component other than `AccordItem`. Return an error if that happens.
`AccordItem` must have `AccordBtn` and `AccordPanel` as its decendant, but they don't have to be direct descendants. Either you have `AccordBtn` or both `AccordBtnOpen` and `AccordBtnClose` inside `AccordItem`

You should be able to use this accordion and customize how it looks as you can see in the demonstration of this app.

### My Solution

> FIXME: This accordion implementation does not follow all best accessibility practices. It should be motified according to the specifications, read more at [w3.org](https://www.w3.org/TR/wai-aria-practices-1.1/examples/accordion/accordion.html)

Here are all the accordion related subcomponents:

-   `AccordItem`
-   `AccordPanel`
-   `AccordBtnOpen`
-   `AccordBtnClose`
-   `AccordBtn`

```jsx
import { createContext, useState, Children, cloneElement, useContext } from "react"

const AccordionItemContext = createContext()
AccordionItemContext.displayName = "AccordionItemContext"

const AccordItem = ({ Component, toggleItem, isOpen, children, ...otherProps }) => {
    Component = Component || "div"
    return (
        <AccordionItemContext.Provider value={{ toggleItem, isOpen }}>
            <Component {...otherProps}>{children}</Component>
        </AccordionItemContext.Provider>
    )
}

const AccordPanel = ({ Component, children, ...otherProps }) => {
    Component = Component || "div"
    const { isOpen } = useContext(AccordionItemContext)
    return isOpen ? <Component {...otherProps}>{children}</Component> : null
}
const AccordBtnOpen = props => {
    const { isOpen } = useContext(AccordionItemContext)
    return isOpen ? null : <AccordBtn {...props} />
}

const AccordBtnClose = props => {
    const { isOpen } = useContext(AccordionItemContext)
    return isOpen ? <AccordBtn {...props} /> : null
}

const AccordBtn = ({ Component, ...otherProps }) => {
    Component = Component || "button"
    const { toggleItem } = useContext(AccordionItemContext)
    return <Component onClick={toggleItem} {...otherProps} />
}
```

Here's the top level `Accord` component

```jsx
function Accord({ Component, children, ...otherProps }) {
    const [openIndices, setOpenIndices] = useState([])

    const updateAccord = currentIndex => {
        setOpenIndices(
            openIndices.includes(currentIndex)
                ? openIndices.filter(index => index !== currentIndex)
                : [...openIndices, currentIndex]
        )
    }

    Component = Component || "div"
    return (
        <Component {...otherProps}>
            {Children.map(children, (child, index) => {
                if (child.type !== AccordItem) {
                    throw new Error(
                        `Only the AccordItem can be a direct child of the Accord component. This child is ${child.type.name}`
                    )
                }
                return cloneElement(child, {
                    index,
                    toggleItem: () => updateAccord(index),
                    isOpen: openIndices.includes(index),
                })
            })}
        </Component>
    )
}

export { Accord, AccordItem, AccordPanel, AccordBtn, AccordBtnClose, AccordBtnOpen }
```

Here's another bare minimum example usage of the component

```jsx
const App = () => {
    return (
        <Accord>
            {TOWERS.map(tower => (
                <AccordItem key={tower.name}>
                    <div>
                        <AccordBtnOpen>{tower.name} (click to open) </AccordBtnOpen>
                        <AccordBtnClose>{tower.name} (click to close)</AccordBtnClose>
                    </div>
                    <AccordPanel>
                        <pre>{JSON.stringify(tower, null, 2)}</pre>
                    </AccordPanel>
                </AccordItem>
            ))}
        </Accord>
    )
}
```

Here's a stylized version of the above example

```jsx
const FirstExample = () => (
    <Accord style={{ width: "250px" }}>
        {TOWERS.slice(0, 10).map(tower => {
            const { name, imageUrl, towerType, kingdom, buildCost } = tower

            return (
                <AccordItem key={name}>
                    <AccordBtnOpen Component={PlainButton} style={buttonStyle}>
                        <FaArrowAltCircleDown />
                        {tower.name}
                        <FaArrowAltCircleDown />
                    </AccordBtnOpen>
                    <AccordBtnClose Component={ColoredButton} style={buttonStyle}>
                        <FaArrowAltCircleUp />
                        {tower.name}
                        <FaArrowAltCircleUp />
                    </AccordBtnClose>
                    <AccordPanel style={{ display: "flex", justifyContent: "center" }}>
                        <RoundedImage src={imageUrl} alt={name} height={75} width={75} />
                        <div style={{ margin: "5px" }}>
                            <span>
                                towertype: {towerType}
                                buildcost: {buildCost}
                                kingdom: {kingdom}
                            </span>
                        </div>
                    </AccordPanel>
                </AccordItem>
            )
        })}
    </Accord>
)
```

Here's a cool way you can use the components, somewhat different than usual.

```jsx
const SecondExample = () => (
    <Accord>
        {TOWERS.slice(0, 8).map((tower, index) => {
            const { name, imageUrl, towerType, kingdom, buildCost } = tower

            const panel = (
                <AccordPanel style={{ margin: "0px 10px" }}>
                    <h1>{name}</h1>
                    <span>
                        buildcost: {buildCost} kingdom: {kingdom} <br />({towerType})
                    </span>
                </AccordPanel>
            )

            return (
                <AccordItem key={name} style={{ display: "flex" }}>
                    <div style={{ width: "calc(100% - 50px", textAlign: "right" }}>
                        {index % 2 === 0 ? null : panel}
                    </div>
                    <AccordBtn Component={SquareButton} side="50px">
                        <RoundedImage src={imageUrl} alt={name} height={50} width={50} />
                    </AccordBtn>
                    <div style={{ width: "calc(100% - 50px" }}>
                        {index % 2 === 0 ? panel : null}
                    </div>
                </AccordItem>
            )
        })}
    </Accord>
)
```

### Inspired by:

-   [Kent C Dodd's Simply React Talk / Repo](https://github.com/kentcdodds/simply-react)
-   [React UI accordion](https://reach.tech/accordion/)
