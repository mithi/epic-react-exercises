import { useRouter } from "next/router"
import PageLayout from "../../../components/page-layout"

const title = (
    <>
        React <br /> Performance
    </>
)

const numberOfPages = 5
const pathname = "/react/performance"
const Home = () => {
    const {
        query: { page },
    } = useRouter()

    const notes = "Notes"
    const code = "Code"

    return <PageLayout {...{ title, page, code, notes, numberOfPages, pathname }} />
}
export default Home
