import dynamic from "next/dynamic"
import PageLayout from "components/notebook"
import { sectionProperties, pageContents } from "utils"

const DynamicMarkdownRender = dynamic(() => import("components/markdown-render"), {
    loading: () => <p>Loading..</p>,
})

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
            notes: <DynamicMarkdownRender children={notesString} />,
            pageId,
            numberOfPages,
            properties,
            pathname: `/react/${section}`,
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
