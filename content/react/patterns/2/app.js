import {
    Accord,
    AccordItem,
    AccordPanel,
    AccordBtnOpen,
    AccordBtnClose,
} from "./components/accord"
import TOWERS from "content/react/advanced-hooks/3/components/towers"

const App = () => {
    return (
        <Accord>
            {TOWERS.map(tower => {
                return (
                    <AccordItem key={tower.name}>
                        <div>
                            <AccordBtnOpen>{tower.name} (click to open) </AccordBtnOpen>
                            <AccordBtnClose>{tower.name} (click to close)</AccordBtnClose>
                        </div>
                        <AccordPanel>
                            <pre>{JSON.stringify(tower, null, 2)}</pre>
                        </AccordPanel>
                    </AccordItem>
                )
            })}
        </Accord>
    )
}

export default App
