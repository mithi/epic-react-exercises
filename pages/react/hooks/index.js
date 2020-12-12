import { useRouter } from "next/router"
import Code from "../../../components/code"
import PageLayout from "../../../components/page-layout"
import notes00 from "../../../content/react/hooks/notes-js/note-00"
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

    const notes = notes00
    const code = <Code children={codeString00} />

    return <PageLayout {...{ title, page, code, notes, numberOfPages, pathname }} />
}
export default Home
