import { useRouter } from "next/router"
import Code from "../../../components/code"
import PageLayout from "../../../components/page-layout"
import Notes00 from "../../../content/react/fundamentals/notes/note-00"
import codeString00 from "../../../content/react/fundamentals/code/code-00"

const title = <>React Hooks</>

const numberOfPages = 15
const pathname = "/react/hooks"

const Home = () => {
    const {
        query: { page },
    } = useRouter()

    const notes = <Notes00 {...{ currentPage: page }} />
    const code = <Code children={codeString00} />

    return <PageLayout {...{ title, page, code, notes, numberOfPages, pathname }} />
}
export default Home
