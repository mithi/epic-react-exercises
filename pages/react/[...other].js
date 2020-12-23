import Main from "components/main"
import ReactMenu from "components/main/react-menu"

export async function getServerSideProps(context) {
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
            <ReactMenu />
        </Main>
    )
}

export default Page
