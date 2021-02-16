import { Children, cloneElement } from "react"
import { SquareButton } from "../button"

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
            >
                {pageId}
            </SquareButton>
        )
    })
    return <div style={{ display: "flex", marginBottom: "10px" }}>{pageButtons}</div>
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

export { Pagination, CallToActionUl }
