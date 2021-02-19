import { MenuStateProvider } from "providers"
import Main from "components/main"
import ReactMenu from "components/main/react-menu"

export default function Home() {
    return (
        <Main>
            <MenuStateProvider>
                <ReactMenu showCloseButton={false} />
            </MenuStateProvider>
        </Main>
    )
}
