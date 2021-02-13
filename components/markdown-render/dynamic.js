import dynamic from "next/dynamic"
import { SpinnerDots } from "../spinner"

const DynamicMarkdownRender = dynamic(
    () => import("components/markdown-render").then(mod => mod.MarkdownRender),
    {
        // eslint-disable-next-line react/display-name
        loading: () => <SpinnerDots />,
    }
)

const DynamicMiniCode = dynamic(
    () => import("components/markdown-render").then(mod => mod.MiniCode),
    {
        // eslint-disable-next-line react/display-name
        loading: () => <SpinnerDots />,
    }
)

export { DynamicMarkdownRender, DynamicMiniCode }
