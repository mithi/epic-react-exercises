import { useRouter } from "next/router"
import PageLayout from "../../../components/page-layout"

const title = (
    <>
        Building an <br /> Epic React App
    </>
)

const numberOfPages = 5
const pathname = "/react/advanced-hooks"
const Home = () => {
    const {
        query: { page },
    } = useRouter()

    const notes = "Notes"
    const code = "Code"

    return <PageLayout {...{ title, page, code, notes, numberOfPages, pathname }} />
}
export default Home
