import landingString from "content/landing/index.md"
import Main from "components/main"
import MarkdownRender from "components/markdown-render"

export default function Home() {
    return (
        <div>
            <Main>
                <div style={{ width: "100%", maxWidth: "600px", padding: "30px" }}>
                    <MarkdownRender>{landingString}</MarkdownRender>
                </div>
            </Main>
        </div>
    )
}
