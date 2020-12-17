import { IconButton, LinkButton } from "../button"
import { RiArrowLeftRightLine } from "react-icons/ri"
import { ThemeContext } from "../../providers/theme"
import { useContext, useState, useEffect } from "react"
import Main from "../main"

const Pagination = ({ numberOfPages, currentPageId, pathname }) => {
    return (
        <div
            style={{
                display: "flex",
                justifyContent: "flex-start",
                flexWrap: "wrap",
                alignItems: "center",
                marginBottom: "20px",
            }}
        >
            {Array.from(Array(numberOfPages).keys()).map(i => {
                const pageId = i + 1
                const border =
                    pageId === currentPageId ? "2px solid var(--green-0)" : null
                const buttonPathname = `${pathname}/${pageId}`
                return (
                    <LinkButton
                        key={buttonPathname}
                        style={{
                            fontFamily: "var(--header-font-00)",
                            margin: "3px",
                            width: "30px",
                            height: "30px",
                            marginTop: "10px",
                            borderRadius: "25%",
                            border,
                        }}
                        page={{
                            pathname: buttonPathname,
                        }}
                        children={pageId}
                    />
                )
            })}
        </div>
    )
}

const Header = ({ children }) => {
    const { togglePrimarySection } = useContext(ThemeContext)
    return (
        <>
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    flexWrap: "wrap-reverse",
                }}
            >
                <h1>{children}</h1>
                <div>
                    <IconButton onClick={togglePrimarySection} style={{ margin: 0 }}>
                        <RiArrowLeftRightLine />
                    </IconButton>
                </div>
            </div>
        </>
    )
}

const PageLayout = ({ title, pageId, code, notes, numberOfPages, pathname }) => {
    const { primarySection } = useContext(ThemeContext)
    const [currentPageId, setCurrentPageId] = useState(1)

    useEffect(() => {
        setCurrentPageId(Math.max(1, Math.min(Number(pageId) || 1, numberOfPages)))
    }, [pageId])

    const heading = (
        <>
            <Header children={title} />
            <Pagination {...{ numberOfPages, currentPageId, pathname }} />
        </>
    )

    let styledNotes = (
        <span
            style={{
                lineHeight: "1.5",
                letterSpacing: "0px",
                wordSpacing: "7px",
                fontSize: "18px",
            }}
        >
            {notes}
        </span>
    )
    let div1 = (
        <>
            {heading}
            {styledNotes}
        </>
    )
    let div2 = code

    if (primarySection === "code") {
        div2 = styledNotes

        div1 = (
            <>
                {heading}
                {code}
            </>
        )
    }

    return <Main {...{ div1, div2 }}></Main>
}

export default PageLayout
