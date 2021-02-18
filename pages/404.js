import { PrettyHeader } from "components/pretty-defaults"
import { useWindowSize } from "hooks"
import { ImpossiblePage } from "components/impossible-page"

export default function FourOhfour() {
    const { width, height } = useWindowSize()
    const fontSize = width > 850 ? `${0.5 * height}px` : `${0.35 * width}px`

    return (
        <ImpossiblePage
            issueMessage="Unexpected 404: File not found"
            style={{ justifyContent: width > 850 ? "center" : "start" }}
        >
            <PrettyHeader Component="h1" style={{ fontSize }}>
                404
            </PrettyHeader>
        </ImpossiblePage>
    )
}
