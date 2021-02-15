import { Children, cloneElement } from "react"
import { LinkButton } from "../button"

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
            <LinkButton
                key={buttonPathname}
                disabled={disabled}
                href={buttonPathname}
                aria-label={label}
                style={{ height: "30px", width: "30px", margin: "3px" }}
            >
                {pageId}
            </LinkButton>
        )
    })
    return <div style={PAGINATION_STYLE}>{pageButtons}</div>
}

const BUTTON_STYLE = {
    margin: "3px",
    width: "30px",
    height: "30px",
    fontSize: "15px",
}

const BUTTON_CONTAINER_STYLE = {
    display: "flex",
    justifyContent: "flex-start",
    marginBottom: "-15px",
    marginTop: "10px",
}

function NotebookPageButtons({ children }) {
    // assumes only LinkButton or LinkOutButtons or falsy are passed as children
    const styledChildren = Children.map(children, child => {
        if (!child) {
            return null
        }
        return cloneElement(child, { style: BUTTON_STYLE })
    })

    return <div style={{ ...BUTTON_CONTAINER_STYLE }}>{styledChildren}</div>
}

const CallToActionUl = ({ children }) => {
    const LIST_STYLE = {
        listStyleType: "none",
        margin: "0",
        padding: "2px 0",
        lineHeight: "1.1",
    }

    // assumes only "li" are passed as children
    const styledChildren = Children.map(children, child => {
        return cloneElement(child, { style: LIST_STYLE })
    })

    return <ul style={{ padding: "0", margin: "5px" }}>{styledChildren}</ul>
}

export { Pagination, NotebookPageButtons, CallToActionUl }
