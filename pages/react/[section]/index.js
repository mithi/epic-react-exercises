import { DynamicMarkdownRender } from "components/markdown-render/dynamic"
import { sectionProperties, pageContents } from "utils"
import PageLayout from "components/notebook"

export const PageLayoutHelper = ({
    notesString,
    section,
    numberOfPages,
    pageId,
    properties,
    hasApp,
}) => (
    <PageLayout
        {...{
            notes: <DynamicMarkdownRender>{notesString}</DynamicMarkdownRender>,
            pageId,
            numberOfPages,
            properties,
            topic: "react",
            section,
            hasApp,
        }}
    />
)

export async function getStaticPaths() {
    return {
        paths: Object.keys(sectionProperties("react")).map(section => ({
            params: { section },
        })),
        fallback: false,
    }
}

export async function getStaticProps({ params }) {
    const pageId = 1
    const { section } = params
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

const Home = props => <PageLayoutHelper {...props} />

export default Home
