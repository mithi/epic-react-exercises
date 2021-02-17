/* eslint-disable react/display-name */
import { useState } from "react"
import ReactMarkdown from "react-markdown"
import {
    PrettyHeader,
    SimpleLink,
    OnClickText,
    BorderedDiv,
} from "components/pretty-defaults"
import CodeBlock from "./dynamic-code-block"

const Code = ({ children, language }) => {
    const [showCode, setShowCode] = useState(false)
    const codeBlock = showCode && <CodeBlock {...{ language }}>{children}</CodeBlock>

    return (
        <BorderedDiv style={{ margin: "10px", borderStyle: "dashed", display: "block" }}>
            <OnClickText onClick={() => setShowCode(!showCode)}>
                <PrettyHeader style={{ margin: "10px" }}>
                    {showCode ? "Hide Code" : "Show Code"}
                </PrettyHeader>
            </OnClickText>
            {codeBlock}
        </BorderedDiv>
    )
}

const CustomHeading = ({ children, level }) => {
    const style = { marginTop: "20px" }
    switch (level) {
        case 1:
            return (
                <PrettyHeader Component="h1" {...{ style }}>
                    {children}
                </PrettyHeader>
            )

        case 2:
            return (
                <PrettyHeader Component="h2" {...{ style }}>
                    {children}
                </PrettyHeader>
            )
        case 3:
            return (
                <PrettyHeader Component="h3" {...{ style }}>
                    {children}
                </PrettyHeader>
            )
        case 4:
            return <PrettyHeader Component="h4">{children}</PrettyHeader>
        case 5:
            return <PrettyHeader Component="h5">{children}</PrettyHeader>
        default:
            return <PrettyHeader Component="h6">{children}</PrettyHeader>
    }
}

const renderers = {
    code: ({ language, value }) => {
        return <Code language={language}>{value}</Code>
    },
    heading: props => {
        return <CustomHeading {...props} />
    },
    link: props => {
        return <SimpleLink {...props} />
    },
    paragraph: props => {
        return <p style={{ margin: "6px" }}>{props.children}</p>
    },
}

const MarkdownRender = ({ children }) => <ReactMarkdown {...{ renderers, children }} />

export default MarkdownRender
