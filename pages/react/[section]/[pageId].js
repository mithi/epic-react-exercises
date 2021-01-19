import { sectionProperties, pageContents } from "utils"
import { PageLayoutHelper } from "."

export async function getStaticPaths() {
    const paths = []
    const sections = Object.keys(sectionProperties("react"))

    for (let section of sections) {
        const { numberOfPages } = sectionProperties("react")[section]
        for (let i of Array(numberOfPages).keys()) {
            paths.push({ params: { section, pageId: (i + 1).toString() } })
        }
    }

    return { paths, fallback: false }
}

export async function getStaticProps({ params }) {
    const { section, pageId } = params
    const { numberOfPages, properties } = sectionProperties("react")[section]
    const { notesString, hasApp } = pageContents("react", section, pageId)

    return {
        props: {
            notesString,
            section,
            numberOfPages,
            pageId,
            properties,
            hasApp,
        },
    }
}

const Home = props => {
    return <PageLayoutHelper {...props} />
}

export default Home
