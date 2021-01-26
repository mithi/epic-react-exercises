import Main from "components/main"
import ReactMenu from "components/main/react-menu"

export async function getServerSideProps() {
    return {
        redirect: {
            destination: "/react",
            permanent: false,
        },
    }
}

function Page() {
    return (
        <Main>
            <ReactMenu showCloseButton={false} style={{ zIndex: 0 }} />
        </Main>
    )
}

export default Page
