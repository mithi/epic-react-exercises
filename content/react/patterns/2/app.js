import { FaArrowAltCircleUp, FaArrowAltCircleDown } from "components/icons"
import {
    Accord,
    AccordItem,
    AccordPanel,
    AccordBtnOpen,
    AccordBtnClose,
} from "./components/accord"
import TOWERS from "content/react/advanced-hooks/3/components/towers"
import { PlainButton, ColoredButton } from "components/button"
import { RoundedImage } from "components/pretty-defaults"

const buttonStyle = {
    display: "flex",
    width: "100%",
    justifyContent: "space-between",
}
const App = () => {
    return (
        <Accord style={{ width: "250px" }}>
            {TOWERS.slice(0, 5).map(tower => {
                const { name, imageUrl, towerType, kingdom, buildCost } = tower

                return (
                    <AccordItem key={name}>
                        <AccordBtnOpen Component={PlainButton} style={buttonStyle}>
                            <FaArrowAltCircleDown />
                            {tower.name}
                            <FaArrowAltCircleDown />
                        </AccordBtnOpen>
                        <AccordBtnClose Component={ColoredButton} style={buttonStyle}>
                            <FaArrowAltCircleUp />
                            {tower.name}
                            <FaArrowAltCircleUp />
                        </AccordBtnClose>
                        <AccordPanel>
                            <div style={{ display: "flex", justifyContent: "center" }}>
                                <RoundedImage
                                    src={imageUrl}
                                    alt={name}
                                    height={75}
                                    width={75}
                                />
                                <div style={{ margin: "5px", fontSize: "12px" }}>
                                    towertype: {towerType}
                                    <br />
                                    buildcost: {buildCost}
                                    <br />
                                    kingdom: {kingdom}
                                </div>
                            </div>
                        </AccordPanel>
                    </AccordItem>
                )
            })}
        </Accord>
    )
}

export default App
