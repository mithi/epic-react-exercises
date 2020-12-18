import "../styles/reset.css"
import "../styles/vars.css"
import "../styles/default.css"
import Head from "next/head"

import { ThemeProvider } from "../providers/theme"

function MyApp({ Component, pageProps }) {
    return (
        <ThemeProvider>
            <Head>
                <title>🌷 Mithi's Epic React Notes</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Component {...pageProps} />
        </ThemeProvider>
    )
}

export default MyApp
