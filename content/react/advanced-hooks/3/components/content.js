import React from "react"
import {
    BorderedDiv,
    PrettyHeader,
    SmallSpan,
    RoundedImage,
} from "components/pretty-defaults"
import TOWERS from "./towers"

const KingdomRushTower = ({ data }) => {
    const { name, imageUrl, towerType, kingdom, buildCost } = data

    return (
        <BorderedDiv style={{ borderStyle: "dashed" }}>
            <RoundedImage src={imageUrl} alt={name} height={75} width={75} />
            <div style={{ margin: "5px" }}>
                <PrettyHeader style={{ fontSize: "15px" }}>{name}</PrettyHeader>

                <div style={{ fontSize: "10px", lineHeight: "1.3" }}>
                    ({towerType})
                    <br />
                    buildCost: {buildCost}
                    <br />
                    kingdom: {kingdom}
                </div>
            </div>
        </BorderedDiv>
    )
}

const KingdomRushTowersDisplay = () => {
    const towers = TOWERS.map(tower => <KingdomRushTower key={tower.name} data={tower} />)
    return (
        <div style={{ textAlign: "center" }}>
            <SmallSpan>(TOP)</SmallSpan>
            <PrettyHeader>Kingdom Rush Towers!</PrettyHeader>
            {towers}
            <SmallSpan>
                There are no more towers to display <br />
                (BOTTOM)
            </SmallSpan>
        </div>
    )
}

export default KingdomRushTowersDisplay
