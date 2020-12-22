import styles from "./Styles.module.css"
import { useContext } from "react"
import { IconButton, LinkButton, LinkAwayIconButton } from "../button"
import { RiArrowLeftRightLine } from "react-icons/ri"
import { FiGithub } from "react-icons/fi"
import { BiRocket } from "react-icons/bi"
import { GlobalStateContext, ThemeContext } from "providers"
import Main from "../main"
import NotebookLayout from "../main/three-sections"

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

const Header = ({ title, deployedSite, repository }) => {
    const { togglePrimarySection } = useContext(GlobalStateContext)
    const { headerFont } = useContext(ThemeContext)

    return (
        <div className={styles.header}>
            <h1 style={{ fontFamily: headerFont }}>{title}</h1>
            <div style={{ display: "flex", justifyContent: "flex-start" }}>
                <IconButton onClick={togglePrimarySection} style={BUTTON_STYLE}>
                    <RiArrowLeftRightLine />
                </IconButton>
                <LinkAwayIconButton page={repository} style={BUTTON_STYLE}>
                    <FiGithub />
                </LinkAwayIconButton>
                <LinkAwayIconButton page={deployedSite} style={BUTTON_STYLE}>
                    <BiRocket />
                </LinkAwayIconButton>
            </div>
        </div>
    )
}

const PageLayout = ({ properties, pageId, code, notes, numberOfPages, pathname }) => {
    const { primarySection } = useContext(GlobalStateContext)
    const currentPageId = Math.max(1, Math.min(Number(pageId) || 1, numberOfPages))
    const styledNotes = <span>{notes}</span>
    const { deployedSite, repository, title } = properties
    const div1 = (
        <>
            <Header {...{ title, deployedSite, repository }} />
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Pagination {...{ numberOfPages, currentPageId, pathname }} />
            </div>
            {primarySection === "code" ? code : styledNotes}
        </>
    )
    const div2 = primarySection !== "code" ? code : styledNotes
    const div3 = <div>preview</div>
    return (
        <Main>
            <NotebookLayout {...{ div1, div2, div3 }} />
        </Main>
    )
}

export default PageLayout
