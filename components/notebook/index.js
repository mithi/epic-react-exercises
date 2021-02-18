import dynamic from "next/dynamic"
import { useMemo } from "react"
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
import { Pagination, CallToActionUl } from "./styled-components"
import { PrettyHeader, SimpleLink } from "../pretty-defaults"

const EPIC_NOTES_REPO_URL = "https://github.com/mithi/epic-notes"
const KOFI_URL = "https://ko-fi.com/minimithi"

const issueUrl = (prefix, editPath) => {
    prefix = prefix.split(" ").join("%20")
    return `${EPIC_NOTES_REPO_URL}/issues/new?title=${prefix}%20${editPath}`
}
const editUrl = editPath =>
    `${EPIC_NOTES_REPO_URL}/edit/main/content/${editPath}/notes.md`

const solutionUrl = editPath => `${EPIC_NOTES_REPO_URL}/edit/main/content/${editPath}`

const BUTTONS_PROPS = {
    deployedSite: {
        "aria-label": "go to source deployed site",
        "children": <BiRocket />,
    },
    repository: {
        "aria-label": "go to source repository",
        "children": <FiGithub />,
    },
    edit: {
        "aria-label": "edit this page",
        "children": <BsPencilSquare />,
    },
    issue: {
        "aria-label": "report a bug",
        "children": <FaBug />,
    },
    home: {
        "aria-label": "go back to main page",
        "children": <FaHome />,
    },
    kofi: {
        "aria-label": "buy me a coffee",
        "children": <BiCoffeeTogo />,
    },
    solution: {
        "aria-label": "view complete solution",
        "children": <AiOutlineRead />,
    },
}

const PageLayout = ({
    properties,
    pageId,
    notes,
    numberOfPages,
    hasApp,
    topic,
    section,
}) => {
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
    const solutionHref = solutionUrl(editPath)
    const issueHref = issueUrl("Better solution! Suggestion for:", editPath)
    const editHref = editUrl(editPath)

    const callToActionBox = (
        <BigHeadNotice headSize={60}>
            <CallToActionUl>
                <li>
                    <SimpleLink href={solutionHref}>
                        {"👀 View the deployed code "}
                    </SimpleLink>
                    on Github.
                </li>
                <li>
                    Not happy with the solution?
                    <SimpleLink href={issueHref}>{"🐞🐛 Suggest a change."}</SimpleLink>
                </li>
                <li>
                    Grammar errors?
                    <SimpleLink href={editHref}>{" ✏️ Edit "}</SimpleLink> this page.
                </li>
            </CallToActionUl>
        </BigHeadNotice>
    )

    const { deployedSite, repository, title } = properties

    const notebookPageButtons = (
        <div style={{ display: "flex", margin: "10px 0" }}>
            {deployedSite && (
                <SquareButton href={deployedSite} {...BUTTONS_PROPS.deployedSite} />
            )}
            {repository && (
                <SquareButton href={repository} {...BUTTONS_PROPS.repository} />
            )}
            {hasApp && <SquareButton href={solutionHref} {...BUTTONS_PROPS.solution} />}
            <SquareButton href={editHref} {...BUTTONS_PROPS.edit} />
            {hasApp && <SquareButton href={issueHref} {...BUTTONS_PROPS.issue} />}
            <SquareButton href="/" {...BUTTONS_PROPS.home} />
            <SquareButton href={KOFI_URL} {...BUTTONS_PROPS.kofi} />
        </div>
    )
    const articlePlus = (
        <>
            {hasApp && callToActionBox}
            {hasApp && notebookPageButtons}
            <article>{notes}</article>
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
                {...{
                    numberOfPages,
                    currentPageId: Number(pageId),
                    pathname: `/${topic}/${section}`,
                }}
            />

            {hasApp ? <App /> : articlePlus}
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
