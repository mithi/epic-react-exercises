import { useContext } from "react"
import { useRouter } from "next/router"

import Main from "../../../components/main"
import Code from "../../../components/code"
import { IconButton, LinkButton } from "../../../components/button"
import { RiArrowLeftRightLine } from "react-icons/ri"

import { ThemeContext } from "../../../providers/theme/"
import code1 from "./sample-code/001"

const PageButton = ({ children }) => {
    return (
        <LinkButton
            style={{
                fontFamily: "var(--header-font-00)",
                width: "30px",
                height: "30px",
                margin: "3px",
                marginTop: "10px",
                borderRadius: "25%",
            }}
            page={{
                pathname: "/react/fundamentals",
                query: { page: children },
            }}
            {...{ children }}
        />
    )
}

const PaginationContainer = ({ children }) => {
    return (
        <div
            style={{
                display: "flex",
                justifyContent: "flex-start",
                flexWrap: "wrap-reverse",
            }}
        >
            {children}
        </div>
    )
}

const Header = () => {
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
                <h1 style={{ fontFamily: "kanit", fontSize: "40px" }}>
                    React <br /> Fundamentals
                </h1>
                <div>
                    <IconButton onClick={togglePrimarySection} style={{ margin: 0 }}>
                        <RiArrowLeftRightLine />
                    </IconButton>
                </div>
            </div>
        </>
    )
}

const Notes = () => {
    const router = useRouter()
    const {
        query: { page },
    } = router

    return (
        <>
            <Header />
            <PaginationContainer>
                <PageButton children={1} />
                <PageButton children={2} />
                <PageButton children={3} />
                <PageButton children={4} />
                <PageButton children={5} />
            </PaginationContainer>
            <p
                style={{
                    margin: "20px",
                    fontSize: "100px",
                    fontFamily: "var(--header-font-00",
                }}
            >
                {page}
            </p>
        </>
    )
}

const Home = () => {
    const { primarySection } = useContext(ThemeContext)
    const div1 = primarySection === "notes" ? <Notes /> : <Code children={code1} />
    const div2 = primarySection === "notes" ? <Code children={code1} /> : <Notes />

    return <Main {...{ div1, div2 }}></Main>
}
export default Home
