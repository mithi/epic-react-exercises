import { useState } from "react"
import { FaArrowAltCircleUp, FaArrowAltCircleDown } from "components/icons"
import {
    Accord,
    AccordItem,
    AccordPanel,
    AccordBtnOpen,
    AccordBtnClose,
    AccordBtn,
} from "./components/accord"
import TOWERS from "content/react/advanced-hooks/3/components/towers"
import { PlainButton, ColoredButton, SquareButton } from "components/button"
import {
    RoundedImage,
    PrettyHeader,
    SmallSpan,
    OnClickText,
} from "components/pretty-defaults"

const buttonStyle = {
    display: "flex",
    width: "100%",
    justifyContent: "space-between",
}

const FirstExample = () => (
    <Accord style={{ width: "250px" }}>
        {TOWERS.slice(0, 10).map(tower => {
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
                    <AccordPanel style={{ display: "flex", justifyContent: "center" }}>
                        <RoundedImage src={imageUrl} alt={name} height={75} width={75} />
                        <div style={{ margin: "5px" }}>
                            <SmallSpan>
                                towertype: {towerType}
                                <br />
                                buildcost: {buildCost}
                                <br />
                                kingdom: {kingdom}
                            </SmallSpan>
                        </div>
                    </AccordPanel>
                </AccordItem>
            )
        })}
    </Accord>
)

const SecondExample = () => (
    <Accord>
        {TOWERS.slice(0, 8).map((tower, index) => {
            const { name, imageUrl, towerType, kingdom, buildCost } = tower
            const panel = (
                <AccordPanel style={{ margin: "0px 10px" }}>
                    <PrettyHeader>{name}</PrettyHeader>
                    <SmallSpan>
                        buildcost: {buildCost} kingdom: {kingdom} <br />({towerType})
                    </SmallSpan>
                </AccordPanel>
            )

            return (
                <AccordItem key={name} style={{ display: "flex" }}>
                    <div style={{ width: "calc(100% - 50px", textAlign: "right" }}>
                        {index % 2 === 0 ? null : panel}
                    </div>
                    <AccordBtn Component={SquareButton} side="50px">
                        <RoundedImage src={imageUrl} alt={name} height={50} width={50} />
                    </AccordBtn>
                    <div style={{ width: "calc(100% - 50px" }}>
                        {index % 2 === 0 ? panel : null}
                    </div>
                </AccordItem>
            )
        })}
    </Accord>
)

const App = () => {
    const [showFirstExample, setShowFirstExample] = useState(true)
    return (
        <div>
            <SmallSpan>
                <OnClickText onClick={() => setShowFirstExample(!showFirstExample)}>
                    Show the other accordion
                </OnClickText>
            </SmallSpan>
            {showFirstExample ? <FirstExample /> : <SecondExample />}
        </div>
    )
}

export default App
