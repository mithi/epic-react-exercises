import { ImpossiblePage } from "components/impossible-page"

export async function getServerSideProps() {
    return { redirect: { destination: "/react", permanent: false } }
}

function Page() {
    const message = `Error! You should have been redirected to /react`
    return (
        <ImpossiblePage issueMessage={message}>
            <p style={{ margin: "30px" }}>{message}</p>
        </ImpossiblePage>
    )
}

export default Page
