import styles from "./Styles.module.css"
import dynamic from "next/dynamic"
import { useMemo } from "react"
import { FiGithub } from "react-icons/fi"
import { BiRocket, BiCoffeeTogo } from "react-icons/bi"
import { BsPencilSquare } from "react-icons/bs"
import { GoOctoface } from "react-icons/go"
import { FaHome, FaBug } from "react-icons/fa"
import { SpinnerDots } from "components/spinner"
import { LinkOutButton, LinkButton } from "../button"
import Main from "../main"
import NotebookLayout from "../main/two-sections"
import { PrettyHeader } from "../pretty-defaults"

const EPIC_NOTES_REPO_URL = "https://github.com/mithi/epic-notes"

const Pagination = ({ numberOfPages, currentPageId, pathname }) => {
    return (
        <div className={styles.pagination}>
            {Array.from(Array(numberOfPages).keys()).map(i => {
                const pageId = i + 1
                const buttonPathname = `${pathname}/${pageId === 1 ? "" : pageId}`
                const disabled = pageId === currentPageId
                const label = `go to page ${pageId} of section: ${pathname}`
                return (
                    <LinkButton
                        key={buttonPathname}
                        disabled={disabled}
                        href={buttonPathname}
                        aria-label={label}
                    >
                        {pageId}
                    </LinkButton>
                )
            })}
        </div>
    )
}

const BUTTON_STYLE = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: "3px",
    width: "30px",
    height: "30px",
    fontSize: "15px",
}

const Header = ({ title, deployedSite, repository, editPath }) => {
    let repositoryButton = null
    if (repository) {
        repositoryButton = (
            <LinkOutButton
                href={repository}
                style={BUTTON_STYLE}
                aria-label={"go to source repository"}
            >
                <FiGithub />
            </LinkOutButton>
        )
    }

    let deployedSiteButton = null
    if (deployedSite) {
        deployedSiteButton = (
            <LinkOutButton
                href={deployedSite}
                style={BUTTON_STYLE}
                aria-label={"go to source deployed site"}
            >
                <BiRocket />
            </LinkOutButton>
        )
    }

    return (
        <div className={styles.header}>
            <PrettyHeader Component="h1" style={{ marginRight: "10px" }}>
                {title}
            </PrettyHeader>
            <div
                style={{
                    display: "flex",
                    justifyContent: "flex-start",
                    marginBottom: "10px",
                }}
            >
                {deployedSiteButton}
                {repositoryButton}
                <LinkOutButton
                    href={`${EPIC_NOTES_REPO_URL}/edit/main/content/${editPath}`}
                    style={BUTTON_STYLE}
                    aria-label={"edit this page"}
                >
                    <BsPencilSquare />
                </LinkOutButton>
            </div>
        </div>
    )
}

const ArticleFooter = ({ editPath }) => {
    const issueUrl = `${EPIC_NOTES_REPO_URL}/issues/new?title=Something%20wrong%20in:%20${editPath}`
    return (
        <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
            <LinkOutButton aria-label={"report a bug"} href={issueUrl}>
                <FaBug />
            </LinkOutButton>
            <LinkOutButton
                href={`${EPIC_NOTES_REPO_URL}/edit/main/content/${editPath}`}
                aria-label={"edit this page"}
            >
                <BsPencilSquare />
            </LinkOutButton>
            <LinkOutButton href={EPIC_NOTES_REPO_URL} aria-label={"star me on github"}>
                <GoOctoface />
            </LinkOutButton>
            <LinkOutButton
                href="https://ko-fi.com/minimithi"
                aria-label={"buy me a coffee"}
            >
                <BiCoffeeTogo />
            </LinkOutButton>
            <LinkButton
                aria-label={"home"}
                href="/"
                style={{ height: "50px", width: "50px", margin: "10px" }}
            >
                <FaHome />
            </LinkButton>
        </div>
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
    const { deployedSite, repository, title } = properties

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

    const editPath = `${topic}/${section}/${pageId}/notes.md`
    const article = (
        <article>
            {notes}
            <ArticleFooter {...{ editPath }} />
        </article>
    )

    const div1 = (
        <>
            <Header
                {...{
                    title,
                    deployedSite,
                    repository,
                    editPath,
                }}
            />
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

    const div2 = hasApp ? article : null

    return (
        <Main>
            <NotebookLayout {...{ div1, div2 }} />
        </Main>
    )
}

export default PageLayout
