import dynamic from "next/dynamic"
import landingString from "content/landing/index.md"
import Main from "components/main"

const DynamicMarkdownRender = dynamic(() => import("components/markdown-render"), {
    loading: () => <p>Loading..</p>,
})

export default function Home() {
    return (
        <div>
            <Main>
                <div style={{ width: "100%", maxWidth: "600px", padding: "10px" }}>
                    <DynamicMarkdownRender>{landingString}</DynamicMarkdownRender>
                </div>
            </Main>
        </div>
    )
}
