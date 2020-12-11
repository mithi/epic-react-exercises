import { useContext, useState, useEffect } from "react"
import { useRouter } from "next/router"

import Main from "../../../components/main"
import Code from "../../../components/code"
import { IconButton, LinkButton } from "../../../components/button"
import { RiArrowLeftRightLine } from "react-icons/ri"
import { ThemeContext } from "../../../providers/theme/"
import code1 from "./sample-code/001"

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

const Notes = ({ currentPage }) => (
    <>
        <p
            style={{
                wordSpacing: "4px",
                lineHeight: "1.5",
                fontSize: "18px",
                margin: "20px",
            }}
        >
            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
            when an unknown printer took a galley of type and scrambled it to make a type
            specimen book.
            <br />
            <span style={{ fontSize: "5rem" }}> {currentPage}</span>
            <br />
            It has survived not only five centuries, but also the leap into electronic
            typesetting, remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages, and more
            recently with desktop publishing software like Aldus PageMaker including
            versions of Lorem Ipsum.
        </p>
    </>
)
const title = (
    <>
        React <br /> Fundamentals
    </>
)

const numberOfPages = 5

const Home = () => {
    const { primarySection } = useContext(ThemeContext)
    const {
        query: { page },
    } = useRouter()
    const [currentPage, setCurrentPage] = useState(1)

    useEffect(() => {
        setCurrentPage(Number(page) || 1)
    }, [page])

    const heading = (
        <>
            <Header children={title} />
            <Pagination {...{ numberOfPages, currentPage }} />
        </>
    )

    const notes = <Notes {...{ currentPage }} />
    const code = <Code children={code1} />
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
export default Home
