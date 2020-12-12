import { useRouter } from "next/router"
import PageLayout from "../../../components/page-layout"

const title = (
    <>
        Testing <br /> React Apps
    </>
)

const numberOfPages = 5
const pathname = "/react/testing"
const Home = () => {
    const {
        query: { page },
    } = useRouter()

    const notes = "Notes"
    const code = "Code"

    return <PageLayout {...{ title, page, code, notes, numberOfPages, pathname }} />
}
export default Home
