import { Children, cloneElement } from "react"
import { SquareButton } from "../button"

const PAGINATION_STYLE = {
    display: "flex",
    alignItems: "center",
    marginBottom: "15px",
}

const Pagination = ({ numberOfPages, currentPageId, pathname }) => {
    const pageButtons = Array.from(Array(numberOfPages).keys()).map(key => {
        const pageId = key + 1
        const buttonPathname = `${pathname}/${pageId}`
        const disabled = pageId === currentPageId
        const label = `go to page ${pageId} of section: ${pathname}`

        return (
            <SquareButton
                key={buttonPathname}
                disabled={disabled}
                href={buttonPathname}
                aria-label={label}
                side="small"
            >
                {pageId}
            </SquareButton>
        )
    })
    return <div style={PAGINATION_STYLE}>{pageButtons}</div>
}

const BUTTON_CONTAINER_STYLE = {
    display: "flex",
    justifyContent: "flex-start",
    marginBottom: "-15px",
    marginTop: "10px",
}

function NotebookPageButtons({ children }) {
    // assumes only buttons or falsy are passed as children
    const styledChildren = Children.map(children, child => {
        if (!child) {
            return null
        }
        return child
    })

    return <div style={BUTTON_CONTAINER_STYLE}>{styledChildren}</div>
}

const LIST_STYLE = {
    listStyleType: "none",
    margin: "0",
    padding: "2px 0",
    lineHeight: "1.1",
}

const CallToActionUl = ({ children }) => {
    // assumes only "li" are passed as children
    const styledChildren = Children.map(children, child => {
        return cloneElement(child, { style: LIST_STYLE })
    })

    return <ul style={{ padding: "0", margin: "5px" }}>{styledChildren}</ul>
}

export { Pagination, NotebookPageButtons, CallToActionUl }
