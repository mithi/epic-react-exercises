import dynamic from "next/dynamic"
import { SpinnerDots } from "../spinner"

const DynamicMarkdownRender = dynamic(() => import("components/markdown-render"), {
    // eslint-disable-next-line react/display-name
    loading: () => <SpinnerDots />,
})

export default DynamicMarkdownRender
