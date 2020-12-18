import Head from "next/head"
import Nav from "../components/notebook/navbar"

export default function Home() {
    return (
        <div>
            <Head>
                <title>Epic React Notes</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Nav />
        </div>
    )
}
