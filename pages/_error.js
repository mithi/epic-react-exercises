import Main from "components/main"

function Error({ statusCode }) {
    const message = statusCode ? `Server Error: ${statusCode}` : "ClientError"
    return (
        <Main>
            <p style={{ margin: "50px" }}>{message}</p>
        </Main>
    )
}

Error.getInitialProps = ({ res, err }) => {
    const statusCode = res ? res.statusCode : err ? err.statusCode : 404
    return { statusCode }
}

export default Error
