import styles from "./Styles.module.css"
import dynamic from "next/dynamic"
import { useMemo, Children, cloneElement } from "react"
import {
    FiGithub,
    BiRocket,
    BiCoffeeTogo,
    BsPencilSquare,
    GoOctoface,
    FaHome,
    FaBug,
} from "../icons"
import { SpinnerDots } from "../spinner"
import { LinkOutButton, LinkButton } from "../button"
import Main from "../main"
import NotebookLayout from "../main/two-sections"
import { PrettyHeader, PrettyAnchor, PrettyLink } from "../pretty-defaults"
import { BigHeadNotice } from "../big-head-girl"

const EPIC_NOTES_REPO_URL = "https://github.com/mithi/epic-notes"
const KOFI_URL = "https://ko-fi.com/minimithi"

const issueUrl = (prefix, editPath) => {
    prefix = prefix.split(" ").join("%20")
    return `${EPIC_NOTES_REPO_URL}/issues/new?title=${prefix}%20${editPath}`
}
const editUrl = editPath =>
    `${EPIC_NOTES_REPO_URL}/edit/main/content/${editPath}/notes.md`

const solutionUrl = editPath => `${EPIC_NOTES_REPO_URL}/edit/main/content/${editPath}`

const PROPERTY_BUTTONS_PROPS = {
    deployedSite: {
        "aria-label": "go to source deployed site",
        "children": <BiRocket />,
    },

    repository: {
        "aria-label": "go to source repository",
        "children": <FiGithub />,
    },
    edit: {
        "aria-label": "edit this page",
        "children": <BsPencilSquare />,
    },
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

const PageLayout = ({
    properties,
    pageId,
    notes,
    numberOfPages,
    hasApp,
    topic,
    section,
}) => {
    const currentPageId = Math.max(1, Math.min(Number(pageId) || 1, numberOfPages))

    const App = useMemo(
        () =>
            hasApp
                ? dynamic(() => import(`content/${topic}/${section}/${pageId}/app`), {
                      // eslint-disable-next-line react/display-name
                      loading: () => <SpinnerDots />,
                  })
                : () => null,
        [hasApp, topic, section, pageId]
    )
    const editPath = `${topic}/${section}/${pageId}`

    const callToActionBox = (
        <BigHeadNotice>
            <CallToActionUl>
                <li>
                    <PrettyAnchor href={solutionUrl(editPath)}>
                        {"👀"} View the deployed code{" "}
                    </PrettyAnchor>
                    on Github.
                </li>
                <li>
                    Not happy with the solution? {"🐞🐛 "}
                    <PrettyAnchor
                        href={issueUrl("Better solution! Suggestion for:", editPath)}
                    >
                        Suggest a change.
                    </PrettyAnchor>
                </li>
                <li>
                    Grammar errors? {"✏️ "}
                    <PrettyAnchor href={editUrl(editPath)}>Edit</PrettyAnchor> this page.
                </li>
                <li>
                    Other options:{" "}
                    <PrettyLink href="/">go back to main {"🏠"}</PrettyLink> or
                    <PrettyAnchor href={KOFI_URL}> {"☕"} buy me a coffee</PrettyAnchor>!
                </li>
            </CallToActionUl>
        </BigHeadNotice>
    )

    const articleFooterButtons = (
        <ArticleFooterButtons>
            <LinkOutButton
                href={issueUrl("Something is wrong in:", editPath)}
                aria-label="report a bug"
            >
                <FaBug />
            </LinkOutButton>
            <LinkOutButton href={editUrl(editPath)} aria-label="edit this page">
                <BsPencilSquare />
            </LinkOutButton>
            <LinkOutButton href={EPIC_NOTES_REPO_URL} aria-label="star me on github">
                <GoOctoface />
            </LinkOutButton>
            <LinkOutButton href={KOFI_URL} aria-label="buy me a coffee">
                <BiCoffeeTogo />
            </LinkOutButton>
            <LinkButton aria-label="home" href="/" style={HOME_STYLE}>
                <FaHome />
            </LinkButton>
        </ArticleFooterButtons>
    )
    const article = (
        <article>
            {hasApp && callToActionBox}
            {notes}
            {articleFooterButtons}
        </article>
    )

    const { deployedSite, repository, title } = properties
    const deployedSiteButton = deployedSite && (
        <LinkButton href={deployedSite} {...PROPERTY_BUTTONS_PROPS.deployedSite} />
    )
    const repositoryButton = repository && (
        <LinkButton href={repository} {...PROPERTY_BUTTONS_PROPS.repository} />
    )
    const editUrlButton = (
        <LinkButton href={editUrl(editPath)} {...PROPERTY_BUTTONS_PROPS.edit} />
    )

    const header = (
        <HeaderSection>
            <Heading>{title}</Heading>
            <PropertyButtons>
                {deployedSiteButton}
                {repositoryButton}
                {editUrlButton}
            </PropertyButtons>
            <Pagination
                {...{
                    numberOfPages,
                    currentPageId,
                    pathname: `/${topic}/${section}`,
                }}
            />
        </HeaderSection>
    )

    const div1 = (
        <>
            {header}
            {hasApp ? <App /> : article}
        </>
    )

    const div2 = hasApp && article

    return (
        <Main>
            <NotebookLayout {...{ div1, div2 }} />
        </Main>
    )
}

export default PageLayout
