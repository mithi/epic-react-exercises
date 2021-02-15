import styles from "./Styles.module.css"
import { Children, cloneElement } from "react"
import { PrettyHeader } from "../pretty-defaults"
import { LinkButton } from "../button"

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
                style={{ height: "30px", width: "30px", margin: "2px" }}
            >
                {pageId}
            </LinkButton>
        )
    })
    return <>{pageButtons}</>
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
    marginBottom: "10px",
}

function PropertyButtons({ children }) {
    // assumes only LinkButtons are passed as children
    return Children.map(children, child => {
        return cloneElement(child, { style: BUTTON_STYLE })
    })
}

function Heading({ children }) {
    return children
}

function HeaderSection({ children }) {
    let title = null
    let propertyButtons = null
    let pagination = null

    for (let child in children) {
        if (children[child].type === Heading) {
            title = children[child]
        }

        if (children[child].type === PropertyButtons) {
            propertyButtons = children[child]
        }

        if (children[child].type === Pagination) {
            pagination = children[child]
        }
    }

    return (
        <div>
            <div className={styles.header}>
                <PrettyHeader Component="h1" style={{ marginRight: "10px" }}>
                    {title}
                </PrettyHeader>
                <div style={BUTTON_CONTAINER_STYLE}>{propertyButtons}</div>
            </div>
            <div className={styles.pagination}>{pagination}</div>
        </div>
    )
}

const FOOTER_CONTAINER_STYLE = {
    display: "flex",
    justifyContent: "center",
    marginTop: "20px",
}

const HOME_STYLE = { height: "50px", width: "50px", margin: "10px" }

const ArticleFooterButtons = ({ children }) => {
    const styledChildren = Children.map(children, child => {
        return cloneElement(child, { style: HOME_STYLE })
    })
    return <div style={FOOTER_CONTAINER_STYLE}>{styledChildren}</div>
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

export {
    Pagination,
    HeaderSection,
    Heading,
    PropertyButtons,
    ArticleFooterButtons,
    CallToActionUl,
}
