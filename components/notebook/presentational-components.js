import { Children, cloneElement } from "react"
import { SquareButton } from "../button"
import { SmallSpan } from "../pretty-defaults"

const Pagination = ({ numberOfPages, currentPageId, pathname }) => {
    const pageButtons = Array(numberOfPages)
        .fill(null)
        .map((_, key) => {
            const pageId = key + 1
            const buttonPathname = `${pathname}/${pageId}`

            return (
                <SquareButton
                    key={buttonPathname}
                    disabled={pageId === currentPageId}
                    href={buttonPathname}
                    aria-label={`go to page ${pageId} of section: ${pathname}`}
                    title={`go to page ${pageId}`}
                >
                    {pageId}
                </SquareButton>
            )
        })
    return <div style={{ display: "flex", marginBottom: "10px" }}>{pageButtons}</div>
}

const LIST_STYLE = {
    listStyleType: "none",
    margin: 0,
    padding: "1px",
    lineHeight: 1.1,
}

const CallToActionUl = ({ children }) => {
    // assumes only "li" are passed as children
    const styledChildren = Children.map(children, child => {
        return cloneElement(child, { style: LIST_STYLE })
    })

    return (
        <ul style={{ padding: 0 }}>
            <SmallSpan>{styledChildren}</SmallSpan>
        </ul>
    )
}

export { Pagination, CallToActionUl }
