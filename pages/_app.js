import "../styles/reset.css"
import "../styles/vars.css"
import "../styles/default.css"
import Head from "next/head"

import { ThemeProvider } from "../providers/theme"
import { GlobalStateProvider } from "../providers/global-state"

function MyApp({ Component, pageProps }) {
    return (
        <GlobalStateProvider>
            <ThemeProvider>
                <Head>
                    <title>🌷 Mithi's Epic Notes</title>
                    <link rel="icon" href="/favicon.ico" />
                </Head>
                <Component {...pageProps} />
            </ThemeProvider>
        </GlobalStateProvider>
    )
}

export default MyApp
