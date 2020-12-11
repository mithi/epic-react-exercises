import { IconButton, LinkButton } from "../button"
import { RiArrowLeftRightLine } from "react-icons/ri"
import { ThemeContext } from "../../providers/theme"
import { useContext, useState, useEffect } from "react"
import Main from "../main"
import Code from "../code"

const PageButton = ({ children, style }) => {
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
                pathname: "/react/fundamentals",
                query: { page: children },
            }}
            {...{ children }}
        />
    )
}

const Pagination = ({ numberOfPages, currentPage }) => {
    return (
        <div
            style={{
                display: "flex",
                justifyContent: "flex-start",
                flexWrap: "wrap-reverse",
                alignItems: "center",
                marginBottom: "20px",
            }}
        >
            {Array.from(Array(numberOfPages).keys()).map(i => {
                const page = i + 1
                const backgroundColor =
                    page === currentPage ? "var(--gray-00-light)" : null
                const color = page === currentPage ? "var(--gray-05-transparent-3)" : null
                const opacity = page === currentPage ? 0.25 : 1.0

                return (
                    <PageButton
                        key={`fundamentals-${page}`}
                        children={page}
                        style={{ backgroundColor, color, opacity }}
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
                    fontFamily: "kanit",
                    fontSize: "40px",
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

const PageLayout = ({ title, page, code, notes, numberOfPages }) => {
    const { primarySection } = useContext(ThemeContext)
    const [currentPage, setCurrentPage] = useState(1)

    useEffect(() => {
        setCurrentPage(Math.max(1, Math.min(Number(page) || 1, numberOfPages - 1)))
    }, [page])

    const heading = (
        <>
            <Header children={title} />
            <Pagination {...{ numberOfPages, currentPage }} />
        </>
    )

    let div1 = (
        <>
            {heading}
            {notes}
        </>
    )
    let div2 = code

    if (primarySection === "code") {
        div2 = notes
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
