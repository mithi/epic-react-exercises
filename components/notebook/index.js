import { IconButton, LinkButton } from "../button"
import { RiArrowLeftRightLine } from "react-icons/ri"
import { GlobalStateContext } from "../../providers/global-state"
import { useContext } from "react"
import Main from "../main"
import NotebookLayout from "../main/three-sections"

const PAGINATION_STYLE = {
    display: "flex",
    justifyContent: "flex-start",
    flexWrap: "wrap",
    alignItems: "center",
    marginBottom: "20px",
}

const LINK_BUTTON_STYLE = {
    fontFamily: "var(--header-font-00)",
    margin: "3px",
    width: "30px",
    height: "30px",
    marginTop: "10px",
    borderRadius: "25%",
}

const Pagination = ({ numberOfPages, currentPageId, pathname }) => {
    return (
        <div style={PAGINATION_STYLE}>
            {Array.from(Array(numberOfPages).keys()).map(i => {
                const pageId = i + 1
                const buttonPathname = `${pathname}/${pageId === 1 ? "" : pageId}`
                const border =
                    pageId === currentPageId ? "2px solid var(--green-0)" : null

                return (
                    <LinkButton
                        key={buttonPathname}
                        style={{
                            ...LINK_BUTTON_STYLE,
                            border,
                        }}
                        page={buttonPathname}
                        children={pageId}
                    />
                )
            })}
        </div>
    )
}

const HEADER_STYLE = {
    display: "flex",
    justifyContent: "space-between",
    flexWrap: "nowrap",
    marginLeft: "10px",
}

const Header = ({ children }) => {
    const { togglePrimarySection } = useContext(GlobalStateContext)
    return (
        <div style={HEADER_STYLE}>
            <h1>{children}</h1>
            <div>
                <IconButton onClick={togglePrimarySection} style={{ margin: 0 }}>
                    <RiArrowLeftRightLine />
                </IconButton>
            </div>
        </div>
    )
}

const NOTES_STYLE = {
    lineHeight: "1.5",
    letterSpacing: "0px",
    wordSpacing: "7px",
    fontSize: "18px",
}

const PageLayout = ({ title, pageId, code, notes, numberOfPages, pathname }) => {
    const { primarySection } = useContext(GlobalStateContext)
    const currentPageId = Math.max(1, Math.min(Number(pageId) || 1, numberOfPages))
    const styledNotes = <span style={NOTES_STYLE}>{notes}</span>

    const div1 = (
        <>
            <Header children={title} />
            <Pagination {...{ numberOfPages, currentPageId, pathname }} />
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
