import Main from "components/main"

export async function getServerSideProps({ params }) {
    const { section } = params
    return { redirect: { destination: `/react/${section}/1`, permanent: false } }
}

function Page() {
    return <Main>{`This shouldn't be possible.`}</Main>
}

export default Page
