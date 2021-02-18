import { useWindowSize } from "hooks"
import { PrettyHeader } from "components/pretty-defaults"
import { ImpossiblePage } from "components/impossible-page"

function Error({ statusCode }) {
    const { width, height } = useWindowSize()
    const errorType = statusCode ? "server" : "client"
    const fontSize = width > 850 ? `${0.45 * height}px` : `${0.2 * width}px`

    return (
        <ImpossiblePage
            issueMessage={`Error! (${errorType}) status code: ${statusCode}`}
            style={{ justifyContent: width > 850 ? "center" : "start" }}
        >
            <PrettyHeader Component="h1" style={{ fontSize }}>
                Error
            </PrettyHeader>
        </ImpossiblePage>
    )
}

Error.getInitialProps = ({ res, err }) => {
    const statusCode = res ? res.statusCode : err ? err.statusCode : 404
    return { statusCode }
}

export default Error
