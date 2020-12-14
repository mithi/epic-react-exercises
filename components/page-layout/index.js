import { IconButton, LinkButton } from "../button"
import { RiArrowLeftRightLine } from "react-icons/ri"
import { ThemeContext } from "../../providers/theme"
import { useContext, useState, useEffect } from "react"
import Main from "../main"

const PageButton = ({ children, style, pathname }) => {
    return (
        <LinkButton
            style={{
                fontFamily: "var(--header-font-00)",
                margin: "3px",
                width: "30px",
                height: "30px",
                marginTop: "10px",
                borderRadius: "25%",
                ...style,
            }}
            page={{
                pathname,
                query: { page: children },
            }}
            {...{ children }}
        />
    )
}

const Pagination = ({ numberOfPages, currentPage, pathname }) => {
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
                const page = i + 1
                const border = page === currentPage ? "2px solid var(--green-0)" : null

                return (
                    <PageButton
                        key={`fundamentals-${page}`}
                        children={page}
                        pathname={pathname}
                        style={{ border }}
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

const PageLayout = ({ title, page, code, notes, numberOfPages, pathname }) => {
    const { primarySection } = useContext(ThemeContext)
    const [currentPage, setCurrentPage] = useState(1)

    useEffect(() => {
        setCurrentPage(Math.max(1, Math.min(Number(page) || 1, numberOfPages)))
    }, [page])

    const heading = (
        <>
            <Header children={title} />
            <Pagination {...{ numberOfPages, currentPage, pathname }} />
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
