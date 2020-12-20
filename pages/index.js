import Head from "next/head"
import Main from "../components/main"
import { IconButton } from "../components/button"
import { GiButtonFinger } from "react-icons/gi"
import { ThemeContext } from "../providers/theme"
import { useContext } from "react"

export default function Home() {
    const { nextColor, nextHeaderFont, headerFont, nextBodyFont, bodyFont } = useContext(
        ThemeContext
    )
    return (
        <div>
            <Head>
                <title>Epic React Notes</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Main>
                <IconButton onClick={nextColor}>
                    <GiButtonFinger />
                </IconButton>
                <IconButton
                    onClick={nextHeaderFont}
                    style={{
                        width: "auto",
                        fontFamily: headerFont,
                        padding: "50px",
                        fontSize: "50px",
                        borderRadius: "20px",
                    }}
                >
                    Header!
                </IconButton>

                <IconButton
                    onClick={nextBodyFont}
                    style={{
                        width: "auto",
                        fontFamily: bodyFont,
                        padding: "30px",
                        borderRadius: "20px",
                        fontSize: "18px",
                    }}
                >
                    The quick brown fox jumps over the lazy dog.
                </IconButton>
            </Main>
        </div>
    )
}
