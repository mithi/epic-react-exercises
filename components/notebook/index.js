import styles from "./Styles.module.css"
import dynamic from "next/dynamic"
import { useContext } from "react"
import { RiArrowLeftRightLine } from "react-icons/ri"
import { FiGithub } from "react-icons/fi"
import { BiRocket } from "react-icons/bi"
import { BsPencilSquare } from "react-icons/bs"
import { GlobalStateContext, ThemeContext } from "providers"
import { IconButton, LinkButton, LinkAwayIconButton } from "../button"
import Main from "../main"
import NotebookLayout from "../main/two-sections"

const Pagination = ({ numberOfPages, currentPageId, pathname }) => {
    const { headerFont, primaryColor } = useContext(ThemeContext)

    return (
        <div className={styles.pagination}>
            {Array.from(Array(numberOfPages).keys()).map(i => {
                const pageId = i + 1
                const buttonPathname = `${pathname}/${pageId === 1 ? "" : pageId}`
                const border =
                    pageId === currentPageId ? `2px solid ${primaryColor}` : null

                return (
                    <LinkButton
                        key={buttonPathname}
                        className={styles.linkButton}
                        style={{
                            border,
                            fontFamily: headerFont,
                        }}
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
    const { togglePrimarySection } = useContext(GlobalStateContext)
    const { headerFont } = useContext(ThemeContext)

    return (
        <div className={styles.header}>
            <h1 style={{ fontFamily: headerFont, marginRight: "10px" }}>{title}</h1>
            <div
                style={{
                    display: "flex",
                    justifyContent: "flex-start",
                    marginBottom: "10px",
                }}
            >
                <IconButton
                    onClick={togglePrimarySection}
                    style={BUTTON_STYLE}
                    aria-label={"switch left and right sections"}
                >
                    <RiArrowLeftRightLine />
                </IconButton>
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
                    page={`https://github.com/mithi/epic-react-notes/edit/main/content${editPath}`}
                    style={BUTTON_STYLE}
                    aria-label={"edit this page"}
                >
                    <BsPencilSquare />
                </LinkAwayIconButton>
            </div>
        </div>
    )
}

const PageLayout = ({
    properties,
    pageId,
    notes,
    numberOfPages,
    pathname,
    hasApp,
    topic,
    section,
}) => {
    const { primarySection } = useContext(GlobalStateContext)
    const currentPageId = Math.max(1, Math.min(Number(pageId) || 1, numberOfPages))
    const styledNotes = <span>{notes}</span>
    const { deployedSite, repository, title } = properties

    const App = hasApp
        ? dynamic(() => import(`content/${topic}/${section}/${pageId}/app`))
        : () => "None"

    const div1 = (
        <>
            <Header
                {...{
                    title,
                    deployedSite,
                    repository,
                    editPath: `${topic}/${section}/${pageId}/notes.md`,
                }}
            />
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Pagination {...{ numberOfPages, currentPageId, pathname }} />
            </div>
            {primarySection === "app" ? <App /> : styledNotes}
        </>
    )
    const div2 = primarySection !== "app" ? <App /> : styledNotes
    return (
        <Main>
            <NotebookLayout {...{ div1, div2 }} />
        </Main>
    )
}

export default PageLayout
