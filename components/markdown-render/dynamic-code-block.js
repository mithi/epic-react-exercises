import dynamic from "next/dynamic"
import { SpinnerDots } from "components/spinner"

const CodeBlock = dynamic(() => import("components/markdown-render/code-block"), {
    // eslint-disable-next-line react/display-name
    loading: () => <SpinnerDots />,
})

export default CodeBlock
