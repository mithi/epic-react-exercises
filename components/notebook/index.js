import dynamic from "next/dynamic"
import { useMemo, useState } from "react"
import {
    FiGithub,
    BiRocket,
    BiCoffeeTogo,
    BsPencilSquare,
    FaHome,
    FaBug,
    AiOutlineRead,
} from "../icons"
import { SpinnerDots } from "../spinner"
import { SquareButton } from "../button"
import Main from "../main"
import NotebookLayout from "../main/two-sections"
import { BigHeadNotice } from "../big-head-girl"
import { PrettyHeader, SimpleLink } from "../pretty-defaults"
import { DefaultErrorBoundary } from "../error-boundary"
import { Pagination, CallToActionUl } from "./presentational-components"

import DynamicMarkdownRender from "../markdown-render/dynamic"

const KOFI_URL = "https://ko-fi.com/minimithi"
const EPIC_NOTES_REPO_URL = "https://github.com/mithi/epic-react-exercises"

const issueUrl = message => `${EPIC_NOTES_REPO_URL}/issues/new?title=${message}`

const editUrl = editPath =>
    `${EPIC_NOTES_REPO_URL}/edit/main/content/${editPath}/notes.md`

const solutionUrl = editPath => `${EPIC_NOTES_REPO_URL}/edit/main/content/${editPath}`

const BUTTONS_PROPS = {
    deployedSite: {
        "aria-label": "go to Epic React deployed site",
        "title": "go to Epic React deployed site",
        "children": <BiRocket />,
    },
    repository: {
        "aria-label": "go to Epic React repository",
        "title": "go to Epic React repository",
        "children": <FiGithub />,
    },
    edit: {
        "aria-label": "edit this page",
        "title": "edit this page",
        "children": <BsPencilSquare />,
    },
    issue: {
        "aria-label": "suggest a better solution via an issue",
        "title": "suggest a better solution via an issue",
        "children": <FaBug />,
    },
    home: {
        "aria-label": "go back to main page",
        "title": "go back to main page",
        "children": <FaHome />,
    },
    kofi: {
        "aria-label": "buy me a coffee",
        "title": "buy me a coffee",
        "children": <BiCoffeeTogo />,
    },
    solution: {
        "aria-label": "view complete solution",
        "title": "view complete solution",
        "children": <AiOutlineRead />,
    },
}

const PageLayout = ({
    properties,
    pageId,
    notesString,
    numberOfPages,
    hasApp,
    topic,
    section,
}) => {
    const [resetCounter, setResetCounter] = useState(0)
    const App = useMemo(
        () =>
            hasApp
                ? dynamic(() => import(`content/${topic}/${section}/${pageId}/app`), {
                      // eslint-disable-next-line react/display-name
                      loading: () => <SpinnerDots />,
                  })
                : () => null,
        [hasApp, topic, section, pageId]
    )

    const editPath = `${topic}/${section}/${pageId}`
    const resetKey = `${editPath}/${resetCounter}`
    const solutionHref = solutionUrl(editPath)
    const issueHref = issueUrl(`Better solution! Suggestion for: ${editPath}`)
    const editHref = editUrl(editPath)

    const editThisPage = <SimpleLink href={editHref}>{"✏️ Edit"}</SimpleLink>
    const viewSolution = (
        <SimpleLink href={solutionHref}>{"👀 View the deployed code "}</SimpleLink>
    )
    const suggestAchange = (
        <SimpleLink href={issueHref}>{"🐞🐛 Suggest a change."}</SimpleLink>
    )

    const callToActionBox = (
        <BigHeadNotice headSize={60}>
            <CallToActionUl>
                <li>{viewSolution} on Github.</li>
                <li>Not happy with the solution? {suggestAchange}</li>
                <li>Grammar errors? {editThisPage} this page.</li>
            </CallToActionUl>
        </BigHeadNotice>
    )

    const { deployedSite, repository, title } = properties
    const bp = BUTTONS_PROPS
    const notebookPageButtons = (
        <div style={{ display: "flex", margin: "10px 0" }}>
            {deployedSite && <SquareButton href={deployedSite} {...bp.deployedSite} />}
            {repository && <SquareButton href={repository} {...bp.repository} />}
            {hasApp && <SquareButton href={solutionHref} {...bp.solution} />}
            <SquareButton href={editHref} {...bp.edit} />
            {hasApp && <SquareButton href={issueHref} {...bp.issue} />}
            <SquareButton href="/" {...bp.home} />
            <SquareButton href={KOFI_URL} {...bp.kofi} />
        </div>
    )
    const articlePlus = (
        <>
            {hasApp && callToActionBox}
            {hasApp && notebookPageButtons}
            <article>
                <DefaultErrorBoundary
                    key={resetKey}
                    resetFunction={() => setResetCounter(resetCounter + 1)}
                    message={`It's a failure within the article (${editPath})`}
                >
                    <DynamicMarkdownRender>{notesString}</DynamicMarkdownRender>
                </DefaultErrorBoundary>
            </article>
            <div style={{ display: "flex", justifyContent: "center", margin: "20px" }}>
                {notebookPageButtons}
            </div>
        </>
    )

    const div1 = (
        <>
            <PrettyHeader Component="h1" style={{ margin: "5px" }}>
                {title}
            </PrettyHeader>
            <Pagination
                currentPageId={Number(pageId)}
                pathname={`/${topic}/${section}`}
                {...{ numberOfPages }}
            />
            <DefaultErrorBoundary
                key={resetKey}
                resetFunction={() => setResetCounter(resetCounter + 1)}
                message={`It's a failure within the example component (${editPath})`}
            >
                {hasApp ? <App /> : articlePlus}
            </DefaultErrorBoundary>
        </>
    )

    const div2 = hasApp && articlePlus

    return (
        <Main>
            <NotebookLayout {...{ div1, div2 }} />
        </Main>
    )
}

export default PageLayout
