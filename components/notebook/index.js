import { IconButton, LinkButton, LinkAwayIconButton } from "../button"
import { RiArrowLeftRightLine } from "react-icons/ri"
import { FiGithub } from "react-icons/fi"
import { BiRocket } from "react-icons/bi"
import { GlobalStateContext } from "../../providers/global-state"
import { ThemeContext } from "../../providers/theme"
import { useContext } from "react"
import Main from "../main"
import NotebookLayout from "../main/three-sections"
import styles from "./Styles.module.css"

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

const Header = ({ title, deployedSite, repository }) => {
    const { togglePrimarySection } = useContext(GlobalStateContext)
    const { headerFont } = useContext(ThemeContext)

    return (
        <div className={styles.header}>
            <h1 style={{ fontFamily: headerFont }}>{title}</h1>
            <div style={{ display: "flex", justifyContent: "flex-start" }}>
                <IconButton
                    onClick={togglePrimarySection}
                    className={styles.linkAwayIcon}
                >
                    <RiArrowLeftRightLine />
                </IconButton>
                <LinkAwayIconButton page={repository} className={styles.linkAwayIcon}>
                    <FiGithub />
                </LinkAwayIconButton>
                <LinkAwayIconButton page={deployedSite} className={styles.linkAwayIcon}>
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
