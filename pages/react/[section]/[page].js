import fs from "fs"
import path from "path"
import PageLayout from "../../../components/page-layout"
import MarkdownRender from "../../../components/markdown-render"

const CONTENT_DIRECTORY = path.join(process.cwd(), "content", "react")

const directoryContents = relativePath => {
    const fullPath = path.join(CONTENT_DIRECTORY, relativePath)
    return fs.readdirSync(fullPath)
}

export async function getStaticPaths() {
    const paths = []
    const sections = directoryContents("")

    for (let section of sections) {
        const pages = directoryContents(section)
        for (let page of pages) {
            paths.push({ params: { section, page } })
        }
    }

    return { paths, fallback: false }
}

export async function getStaticProps(context) {
    const { params } = context
    let { section, page } = params

    const numberOfPages = directoryContents(section).length
    const directory = `${CONTENT_DIRECTORY}/${section}/${page}`
    let rawNote = "No note"
    let rawCode = "No code"

    try {
        rawNote = fs.readFileSync(`${directory}/code.md`, "utf8")
    } catch (error) {
        console.log("no note exists")
    }

    try {
        rawCode = fs.readFileSync(`${directory}/notes.md`, "utf8")
    } catch {
        console.log("no code exists here")
    }
    return { props: { rawNote, rawCode, section, page, numberOfPages } }
}

const Home = ({ rawNote, rawCode, section, page, numberOfPages }) => {
    const pathname = `/react/${section}`
    const notes = <MarkdownRender children={rawNote} />
    const code = <MarkdownRender children={rawCode} />

    return (
        <PageLayout
            {...{
                title: <div>{`${section}/${page}`}</div>,
                pageId: page,
                code,
                notes,
                numberOfPages,
                pathname,
            }}
        />
    )
}

export default Home
