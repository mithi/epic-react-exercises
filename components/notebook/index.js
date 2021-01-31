import styles from "./Styles.module.css"
import dynamic from "next/dynamic"
import { useMemo } from "react"
import { FiGithub } from "react-icons/fi"
import { BiRocket, BiCoffeeTogo } from "react-icons/bi"
import { BsPencilSquare } from "react-icons/bs"
import { GoOctoface } from "react-icons/go"
import { FaHome, FaBug } from "react-icons/fa"
import { SpinnerDots } from "components/spinner"
import { LinkAwayIconButton, DefaultLinkButton, LinkButton } from "../button"
import Main from "../main"
import NotebookLayout from "../main/two-sections"
import { PrettyHeader } from "../pretty-defaults"

const Pagination = ({ numberOfPages, currentPageId, pathname }) => {
    return (
        <div className={styles.pagination}>
            {Array.from(Array(numberOfPages).keys()).map(i => {
                const pageId = i + 1
                const buttonPathname = `${pathname}/${pageId === 1 ? "" : pageId}`
                const disabled = pageId === currentPageId

                return (
                    <DefaultLinkButton
                        key={buttonPathname}
                        disabled={disabled}
                        page={buttonPathname}
                        children={pageId}
                    />
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
                <LinkAwayIconButton
                    page={repository}
                    style={BUTTON_STYLE}
                    aria-label={"go to source repository"}
                >
                    <FiGithub />
                </LinkAwayIconButton>
                <LinkAwayIconButton
                    page={deployedSite}
                    style={BUTTON_STYLE}
                    aria-label={"go to source deployed site"}
                >
                    <BiRocket />
                </LinkAwayIconButton>
                <LinkAwayIconButton
                    page={`https://github.com/mithi/epic-notes/edit/main/content/${editPath}`}
                    style={BUTTON_STYLE}
                    aria-label={"edit this page"}
                >
                    <BsPencilSquare />
                </LinkAwayIconButton>
            </div>
        </div>
    )
}

const ArticleFooter = ({ editPath }) => {
    const issueUrl = `https://github.com/mithi/epic-react-notes/issues/new?title=Something%20wrong%20in%:20${editPath}`
    return (
        <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
            <LinkAwayIconButton aria-label={"report a bug"} page={issueUrl}>
                <FaBug />
            </LinkAwayIconButton>
            <LinkAwayIconButton
                page={`https://github.com/mithi/epic-notes/edit/main/content/${editPath}`}
                aria-label={"edit this page"}
            >
                <BsPencilSquare />
            </LinkAwayIconButton>
            <LinkAwayIconButton
                page="https://github.com/mithi"
                children={<GoOctoface />}
                aria-label={"follow me on github"}
            />
            <LinkAwayIconButton
                page="https://ko-fi.com/minimithi"
                children={<BiCoffeeTogo />}
                aria-label={"buy me a coffee"}
            />
            <LinkButton aria-label={"home"} page="/" isIconButton={true}>
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
                      loading: () => <SpinnerDots />,
                  })
                : () => null,
        [hasApp, topic, section, pageId]
    )

    const editPath = `${topic}/${section}/${pageId}/notes.md`
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
            {hasApp ? (
                <App />
            ) : (
                <article>
                    {notes}
                    <ArticleFooter {...{ editPath }} />
                </article>
            )}
        </>
    )

    const div2 = hasApp ? (
        <article>
            {notes} <ArticleFooter {...{ editPath }} />
        </article>
    ) : null

    return (
        <Main>
            <NotebookLayout {...{ div1, div2 }} />
        </Main>
    )
}

export default PageLayout
