import dynamic from "next/dynamic"
import { useMemo } from "react"
import {
    FiGithub,
    BiRocket,
    BiCoffeeTogo,
    BsPencilSquare,
    GoOctoface,
    FaHome,
    FaBug,
} from "../icons"
import { SpinnerDots } from "../spinner"
import { LinkOutButton, LinkButton } from "../button"
import Main from "../main"
import NotebookLayout from "../main/two-sections"
import { PrettyAnchor, PrettyLink } from "../pretty-defaults"
import { BigHeadNotice } from "../big-head-girl"
import {
    Pagination,
    HeaderSection,
    Heading,
    PropertyButtons,
    ArticleFooterButtons,
    CallToActionUl,
} from "./styled-components"

const EPIC_NOTES_REPO_URL = "https://github.com/mithi/epic-notes"
const KOFI_URL = "https://ko-fi.com/minimithi"

const issueUrl = (prefix, editPath) => {
    prefix = prefix.split(" ").join("%20")
    return `${EPIC_NOTES_REPO_URL}/issues/new?title=${prefix}%20${editPath}`
}
const editUrl = editPath =>
    `${EPIC_NOTES_REPO_URL}/edit/main/content/${editPath}/notes.md`

const solutionUrl = editPath => `${EPIC_NOTES_REPO_URL}/edit/main/content/${editPath}`

const PROPERTY_BUTTONS_PROPS = {
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
    const currentPageId = Math.max(1, Math.min(Number(pageId) || 1, numberOfPages))

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

    const callToActionBox = (
        <BigHeadNotice>
            <CallToActionUl>
                <li>
                    <PrettyAnchor href={solutionUrl(editPath)}>
                        {"👀"} View the deployed code{" "}
                    </PrettyAnchor>
                    on Github.
                </li>
                <li>
                    Not happy with the solution? {"🐞🐛 "}
                    <PrettyAnchor
                        href={issueUrl("Better solution! Suggestion for:", editPath)}
                    >
                        Suggest a change.
                    </PrettyAnchor>
                </li>
                <li>
                    Grammar errors? {"✏️ "}
                    <PrettyAnchor href={editUrl(editPath)}>Edit</PrettyAnchor> this page.
                </li>
                <li>
                    Other options:{" "}
                    <PrettyLink href="/">go back to main {"🏠"}</PrettyLink> or
                    <PrettyAnchor href={KOFI_URL}> {"☕"} buy me a coffee</PrettyAnchor>!
                </li>
            </CallToActionUl>
        </BigHeadNotice>
    )

    const articleFooterButtons = (
        <ArticleFooterButtons>
            <LinkOutButton
                href={issueUrl("Something is wrong in:", editPath)}
                aria-label="report a bug"
            >
                <FaBug />
            </LinkOutButton>
            <LinkOutButton href={editUrl(editPath)} aria-label="edit this page">
                <BsPencilSquare />
            </LinkOutButton>
            <LinkOutButton href={EPIC_NOTES_REPO_URL} aria-label="star me on github">
                <GoOctoface />
            </LinkOutButton>
            <LinkOutButton href={KOFI_URL} aria-label="buy me a coffee">
                <BiCoffeeTogo />
            </LinkOutButton>
            <LinkButton aria-label="home" href="/">
                <FaHome />
            </LinkButton>
        </ArticleFooterButtons>
    )

    const { deployedSite, repository, title } = properties
    const deployedSiteButton = deployedSite && (
        <LinkButton href={deployedSite} {...PROPERTY_BUTTONS_PROPS.deployedSite} />
    )
    const repositoryButton = repository && (
        <LinkButton href={repository} {...PROPERTY_BUTTONS_PROPS.repository} />
    )
    const editUrlButton = (
        <LinkButton href={editUrl(editPath)} {...PROPERTY_BUTTONS_PROPS.edit} />
    )

    const propertyButtons = (
        <PropertyButtons>
            {deployedSiteButton}
            {repositoryButton}
            {editUrlButton}
            <LinkOutButton
                href={issueUrl("Something is wrong in:", editPath)}
                aria-label="report a bug"
            >
                <FaBug />
            </LinkOutButton>

            <LinkButton aria-label="home" href="/">
                <FaHome />
            </LinkButton>
        </PropertyButtons>
    )
    const article = (
        <article>
            {propertyButtons}
            {hasApp && callToActionBox}
            {notes}
            {articleFooterButtons}
        </article>
    )

    const header = (
        <HeaderSection>
            <Heading>{title}</Heading>
            <PropertyButtons>
                {deployedSiteButton}
                {repositoryButton}
                {editUrlButton}
                <LinkOutButton
                    href={issueUrl("Something is wrong in:", editPath)}
                    aria-label="report a bug"
                >
                    <FaBug />
                </LinkOutButton>

                <LinkButton aria-label="home" href="/">
                    <FaHome />
                </LinkButton>
            </PropertyButtons>
            <Pagination
                {...{
                    numberOfPages,
                    currentPageId,
                    pathname: `/${topic}/${section}`,
                }}
            />
        </HeaderSection>
    )

    const div1 = (
        <>
            {header}
            {hasApp ? <App /> : article}
        </>
    )

    const div2 = hasApp && article

    return (
        <Main>
            <NotebookLayout {...{ div1, div2 }} />
        </Main>
    )
}

export default PageLayout
