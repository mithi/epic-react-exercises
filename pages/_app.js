import Head from "next/head"
import { ThemeProvider } from "providers"
import "styles/reset.css"
import "styles/vars.css"
import "styles/default.css"

const URL = "https://epic-react-exercises.vercel.app/"
const TITLE = "Mithi's Epic React Exercises"
const DESCRIPTION =
    "A few practical React exercises with detailed solutions for real-world use cases. This site is very loosely based on Kent C Dodd's Epic React Workshops."
const PREVIEW_IMAGE_URL =
    "https://user-images.githubusercontent.com/1670421/107224673-b31fcb80-6a52-11eb-8b61-4956014ba931.png"

function MyApp({ Component, pageProps }) {
    return (
        <ThemeProvider>
            <Head>
                <title>{TITLE}</title>
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

                <meta property="og:url" content={URL} key="ogurl" />
                <meta property="og:image" content={PREVIEW_IMAGE_URL} key="ogimage" />
                <meta property="og:site_name" content={TITLE} key="ogsitename" />
                <meta property="og:title" content={TITLE} key="ogtitle" />
                <meta property="og:description" content={DESCRIPTION} key="ogdesc" />
                <meta name="description" content={DESCRIPTION} />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Component {...pageProps} />
        </ThemeProvider>
    )
}

export default MyApp
