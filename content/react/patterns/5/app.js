import { SquareButton } from "components/button"
import {
    RoundedImage,
    PrettyHeader,
    SmallSpan,
    OnClickText,
} from "components/pretty-defaults"
import {
    useAccordion,
    combineReducers,
    defaultAccordionReducer,
    onlyOnePanelOpenReducer,
    atleastOnePanelOpenReducer,
} from "./components/use-accordion"
import TOWERS from "content/react/advanced-hooks/3/components/towers"
import { useState } from "react"

const TowerAccordion = ({ reducer }) => {
    const { openedPanelIds, togglePanelId } = useAccordion({ reducer })

    return (
        <>
            {TOWERS.slice(7).map((tower, panelId) => {
                const { name, imageUrl, towerType, kingdom, buildCost } = tower

                const button = (
                    <SquareButton side="50px" onClick={() => togglePanelId(panelId)}>
                        <RoundedImage src={imageUrl} alt={name} height={50} width={50} />
                    </SquareButton>
                )

                const content = (
                    <div style={{ padding: "0px 10px" }}>
                        <PrettyHeader>{name}</PrettyHeader>
                        <SmallSpan>
                            <li>({towerType})</li>
                            <li>buildcost: {buildCost}</li>
                            <li>kingdom: {kingdom}</li>
                        </SmallSpan>
                    </div>
                )

                return (
                    <div key={panelId} style={{ display: "flex" }}>
                        {button}
                        {openedPanelIds.includes(panelId) && content}
                    </div>
                )
            })}
        </>
    )
}

function App() {
    const [onlyOnePanelOpen, setOnlyOnePanelOpen] = useState(false)
    const [atLeastOnePanelOpen, setAtleastOnePanelOpen] = useState(false)

    let reducers = [defaultAccordionReducer]
    if (onlyOnePanelOpen) {
        reducers = [onlyOnePanelOpenReducer, ...reducers]
    }

    if (atLeastOnePanelOpen) {
        reducers = [atleastOnePanelOpenReducer, ...reducers]
    }

    const resetKey = `onlyOnePanel=${onlyOnePanelOpen}+atLeastOnePanel=${atLeastOnePanelOpen}`
    return (
        <>
            <div style={{ fontSize: "12px", margin: "10px" }}>
                <span>
                    (Note: Changing the according settings will reset the accordion state)
                </span>

                <ul>
                    <li>
                        {onlyOnePanelOpen
                            ? "✔ Only one panel can be open at a time"
                            : "✔ Multiple panels can be open"}
                        <OnClickText
                            onClick={() => setOnlyOnePanelOpen(!onlyOnePanelOpen)}
                        >
                            {"-> (change)"}
                        </OnClickText>
                    </li>
                    <li>
                        {atLeastOnePanelOpen
                            ? "✔ There's always at least one panel open"
                            : "✔ It's okay to have no panels open"}
                        <OnClickText
                            onClick={() => setAtleastOnePanelOpen(!atLeastOnePanelOpen)}
                        >
                            {"-> (change)"}
                        </OnClickText>
                    </li>
                </ul>
            </div>
            <TowerAccordion key={resetKey} reducer={combineReducers(...reducers)} />
        </>
    )
}

export default App
