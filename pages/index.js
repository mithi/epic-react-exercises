import DynamicMarkdownRender from "components/markdown-render/dynamic"
import landingString from "content/landing/index.md"
import Main from "components/main"
import TwoSections from "components/main/two-sections"

export default function Home() {
    const div1 = (
        <article>
            <DynamicMarkdownRender>{landingString}</DynamicMarkdownRender>
        </article>
    )

    return (
        <div>
            <Main>
                <TwoSections {...{ div1, div2: null }} />
            </Main>
        </div>
    )
}
