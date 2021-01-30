import Head from "next/head"
import { ThemeProvider } from "providers"
import "styles/reset.css"
import "styles/vars.css"
import "styles/default.css"
import "styles/spinner.css"

function MyApp({ Component, pageProps }) {
    return (
        <ThemeProvider>
            <Head>
                <title>🌷 Mithi's Epic Notes</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Component {...pageProps} />
        </ThemeProvider>
    )
}

export default MyApp
