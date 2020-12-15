import { useRouter } from "next/router"
import Code from "../../../components/code"
import PageLayout from "../../../components/page-layout"
import markdown from "../../../content/react/hooks/md/note-00.md"
import codeString00 from "../../../content/react/hooks/code-js/code-00"

const title = (
    <>
        React Hooks <br /> Fundamentals
    </>
)

const numberOfPages = 7
const pathname = "/react/hooks"

const Home = () => {
    const {
        query: { page },
    } = useRouter()

    const notes = <pre>{markdown}</pre>
    const code = <Code children={codeString00} />

    return <PageLayout {...{ title, page, code, notes, numberOfPages, pathname }} />
}
export default Home
