import Head from "next/head"
import Main from "../components/main"

export default function Home() {
    return (
        <div>
            <Head>
                <title>Epic React Notes</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main>
                <Main />
            </main>
        </div>
    )
}
