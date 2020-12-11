import "../styles/reset.css"
import "../styles/vars.css"
import { ThemeProvider } from "../providers/theme"

function MyApp({ Component, pageProps }) {
    return (
        <ThemeProvider>
            <Component {...pageProps} />
        </ThemeProvider>
    )
}

export default MyApp
