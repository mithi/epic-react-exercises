import Main from "../../../components/main"
import Code from "../../../components/code"
import { IconButton } from "../../../components/button"
import { RiArrowLeftRightLine } from "react-icons/ri"
import { useContext } from "react"
import { ThemeContext } from "../../../providers/theme/"
import code1 from "./sample-code/001"

const Header = () => {
    const { togglePrimarySection } = useContext(ThemeContext)
    return (
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
    )
}

const Notes = () => <Header />

const Home = () => {
    const { primarySection } = useContext(ThemeContext)
    const div1 = primarySection === "notes" ? <Notes /> : <Code children={code1} />
    const div2 = primarySection === "notes" ? <Code children={code1} /> : <Notes />

    return <Main {...{ div1, div2 }}></Main>
}
export default Home
