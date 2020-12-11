import { useRouter } from "next/router"
import Code from "../../../components/code"
import PageLayout from "../../../components/page-layout"
import Notes00 from "../../../content/react/fundamentals/notes/note-00"
import codeString00 from "../../../content/react/fundamentals/code/code-00"

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

    const notes = <Notes00 {...{ currentPage: page }} />
    const code = <Code children={codeString00} />

    return <PageLayout {...{ title, page, code, notes, numberOfPages }} />
}
export default Home
