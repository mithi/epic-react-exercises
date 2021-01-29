import dynamic from "next/dynamic"
import Head from "next/head"
import "styles/reset.css"
import "styles/vars.css"
import "styles/default.css"
import "styles/spinner.css"

const DynamicGlobalStateProvider = dynamic(() =>
    import("providers").then(mod => mod.GlobalStateProvider)
)

const DynamicThemeProvider = dynamic(() =>
    import("providers").then(mod => mod.ThemeProvider)
)
function MyApp({ Component, pageProps }) {
    return (
        <DynamicGlobalStateProvider>
            <DynamicThemeProvider>
                <Head>
                    <title>🌷 Mithi's Epic Notes</title>
                    <link rel="icon" href="/favicon.ico" />
                </Head>
                <Component {...pageProps} />
            </DynamicThemeProvider>
        </DynamicGlobalStateProvider>
    )
}

export default MyApp
