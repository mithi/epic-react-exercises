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
