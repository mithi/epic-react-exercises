import { useRouter } from "next/router"
import Code from "../../../components/code"
import PageLayout from "../../../components/page-layout"

import code1 from "./sample-code/001"

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
    const {
        query: { page },
    } = useRouter()

    const notes = <Notes {...{ currentPage: page }} />
    const code = <Code children={code1} />

    return <PageLayout {...{ title, page, code, notes, numberOfPages }} />
}
export default Home
