import { useRouter } from "next/router"
import PageLayout from "../../../components/page-layout"
import MarkdownRender from "../../../components/markdown-render"

import note00 from "../../../content/react/hooks/note/note-00.md"
import code00 from "../../../content/react/hooks/code/code-00.md"

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

    const notes = <MarkdownRender children={note00} />
    const code = <MarkdownRender children={code00} />

    return <PageLayout {...{ title, page, code, notes, numberOfPages, pathname }} />
}
export default Home
