import { createContext, useState, Children, cloneElement, useContext } from "react"

const AccordionItemContext = createContext()
AccordionItemContext.displayName = "AccordionItemContext"

const AccordItem = ({ toggleItem, isOpen, children }) => {
    return (
        <AccordionItemContext.Provider value={{ toggleItem, isOpen }}>
            {children}
        </AccordionItemContext.Provider>
    )
}

const AccordPanel = ({ children }) => {
    const { isOpen } = useContext(AccordionItemContext)
    return isOpen ? children : null
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
function Accord({ children }) {
    const [openIndices, setOpenIndices] = useState([])

    const updateAccord = currentIndex => {
        setOpenIndices(
            openIndices.includes(currentIndex)
                ? openIndices.filter(index => index !== currentIndex)
                : [...openIndices, currentIndex]
        )
    }

    return Children.map(children, (child, index) => {
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
    })
}

export { Accord, AccordItem, AccordPanel, AccordBtn, AccordBtnClose, AccordBtnOpen }