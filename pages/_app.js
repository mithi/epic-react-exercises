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
                <title>{`Mithi's`} Epic Notes: Javascript, React and More</title>
                <link
                    rel="icon"
                    type="image/png"
                    sizes="32x32"
                    href="/favicon-32x32.png"
                />
                <link
                    rel="icon"
                    type="image/png"
                    sizes="16x16"
                    href="/favicon-16x16.png"
                />
                <link
                    rel="apple-touch-icon"
                    sizes="180x180"
                    href="/apple-touch-icon.png"
                />
                <link rel="manifest" href="/site.webmanifest" />
                <meta name="theme-color" content="#000000" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Component {...pageProps} />
        </ThemeProvider>
    )
}

export default MyApp
