import "../styles/reset.css"
import "../styles/vars.css"
import "../styles/pygments.css"
import "../styles/default.css"

import { ThemeProvider } from "../providers/theme"

function MyApp({ Component, pageProps }) {
    return (
        <ThemeProvider>
            <Component {...pageProps} />
        </ThemeProvider>
    )
}

export default MyApp
