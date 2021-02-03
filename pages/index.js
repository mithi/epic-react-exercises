import dynamic from "next/dynamic"
import landingString from "content/landing/index.md"
import Main from "components/main"
import TwoSections from "components/main/two-sections"
import { SpinnerDots } from "components/spinner"
const DynamicMarkdownRender = dynamic(() => import("components/markdown-render"), {
    // eslint-disable-next-line react/display-name
    loading: () => <SpinnerDots />,
})

export default function Home() {
    const div1 = (
        <article style={{ width: "100%", maxWidth: "600px", padding: "10px" }}>
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
