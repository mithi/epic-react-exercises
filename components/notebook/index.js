import styles from "./Styles.module.css"
import dynamic from "next/dynamic"
import { useMemo } from "react"
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

const PageButton = ({ pageId, pathname, currentPageId }) => {
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
}

const Pagination = ({ numberOfPages, currentPageId, pathname }) => {
    const pageButtons = Array.from(Array(numberOfPages).keys()).map(key => (
        <PageButton
            key={pathname + key}
            {...{ pageId: key + 1, pathname, currentPageId }}
        />
    ))
    return <div className={styles.pagination}>{pageButtons}</div>
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

const HeaderSection = ({ properties, editPath }) => {
    const { deployedSite, repository, title } = properties

    let repositoryButton = repository && {
        "href": repository,
        "aria-label": "go to source repository",
        "children": <FiGithub />,
    }

    let deployedSiteButton = deployedSite && {
        "href": deployedSite,
        "aria-label": "go to source deployed site",
        "children": <BiRocket />,
    }

    const editButton = {
        "href": editUrl(editPath),
        "aria-label": "edit this page",
        "children": <BsPencilSquare />,
    }

    const buttons = [repositoryButton, deployedSiteButton, editButton].map(
        props =>
            props && <LinkOutButton style={BUTTON_STYLE} key={props.href} {...props} />
    )

    return (
        <div className={styles.header}>
            <PrettyHeader Component="h1" style={{ marginRight: "10px" }}>
                {title}
            </PrettyHeader>
            <div style={BUTTON_CONTAINER_STYLE}>{buttons}</div>
        </div>
    )
}

const FOOTER_CONTAINER_STYLE = {
    display: "flex",
    justifyContent: "center",
    marginTop: "20px",
}

const HOME_STYLE = { height: "50px", width: "50px", margin: "10px" }

const ArticleFooter = ({ editPath }) => {
    return (
        <div style={FOOTER_CONTAINER_STYLE}>
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
        </div>
    )
}

const CallToActionBox = ({ editPath }) => {
    return (
        <BigHeadNotice>
            <PrettyAnchor href={solutionUrl(editPath)}>
                {"👀"} View the deployed code
            </PrettyAnchor>{" "}
            on Github. <br />
            Not happy with the solution? {"🐞🐛 "}
            <PrettyAnchor href={issueUrl("Better solution! Suggestion for:", editPath)}>
                Suggest a change.
                <br />
            </PrettyAnchor>{" "}
            Grammar errors? {"✏️ "}
            <PrettyAnchor href={editUrl(editPath)}>Edit</PrettyAnchor> this page. <br />{" "}
            Other options: <PrettyLink href="/">go back to main</PrettyLink> {"🏠"} or
            <PrettyAnchor href={KOFI_URL}> {"☕"} buy me a coffee</PrettyAnchor>!
        </BigHeadNotice>
    )
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
    const article = (
        <article>
            {hasApp && <CallToActionBox {...{ editPath }} />}
            {notes}
            <ArticleFooter {...{ editPath }} />
        </article>
    )

    const div1 = (
        <>
            <HeaderSection {...{ properties, editPath }} />
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Pagination
                    {...{
                        numberOfPages,
                        currentPageId,
                        pathname: `/${topic}/${section}`,
                    }}
                />
            </div>
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
