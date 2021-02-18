import Main from "components/main"

export async function getServerSideProps() {
    return { redirect: { destination: "/react", permanent: false } }
}

function Page() {
    return <Main>{`This shouldn't be possible.`}</Main>
}

export default Page
