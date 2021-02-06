import React from "react"
import { BorderedDiv, PrettyHeader } from "components/pretty-defaults"

const TOWERS = [
    {
        name: "weirdwood",
        kingdom: "KRO",
        imageUrl:
            "https://storage.googleapis.com/kingdom-rush-towers.appspot.com/kro-artillery-4b-weirdwood.png",
        towerType: "ARTILLERY",
        buildCost: 400,
    },
    {
        name: "500mm big bertha",
        kingdom: "KR",
        imageUrl:
            "https://storage.googleapis.com/kingdom-rush-towers.appspot.com/kr-artillery-4a-500mm-big-bertha.png",
        towerType: "ARTILLERY",
        buildCost: 400,
    },
    {
        name: "rocket riders, 4",
        kingdom: "KRV",
        imageUrl:
            "https://storage.googleapis.com/kingdom-rush-towers.appspot.com/krv-rocket-4.png",
        towerType: "ARTILLERY",
        buildCost: 370,
    },
    {
        name: "sorcerer mage",
        kingdom: "KR",
        imageUrl:
            "https://storage.googleapis.com/kingdom-rush-towers.appspot.com/kr-mage-4b.png",
        towerType: "MAGE",
        buildCost: 300,
    },
    {
        name: "high elven mage",
        kingdom: "KRO",
        imageUrl:
            "https://storage.googleapis.com/kingdom-rush-towers.appspot.com/kro-magic-4a-high-elven-mage.png",
        towerType: "MAGE",
        buildCost: 300,
    },
    {
        name: "specters mausoleum, 4",
        kingdom: "KRV",
        imageUrl:
            "https://storage.googleapis.com/kingdom-rush-towers.appspot.com/krv-specters-mausoleum-4.png",
        towerType: "MAGE",
        buildCost: 230,
    },
    {
        name: "necromancer tower",
        kingdom: "KRF",
        imageUrl:
            "https://storage.googleapis.com/kingdom-rush-towers.appspot.com/krf-mage-4a-necromancer-tower.png",
        towerType: "MAGE",
        buildCost: 300,
    },
    {
        name: "musketeer garrison",
        kingdom: "KR",
        imageUrl:
            "https://storage.googleapis.com/kingdom-rush-towers.appspot.com/kr-ranged-4b-musketeer-garrison.png",
        towerType: "ARCHER",
        buildCost: 230,
    },
    {
        name: "golden longbows",
        kingdom: "KRO",
        imageUrl:
            "https://storage.googleapis.com/kingdom-rush-towers.appspot.com/kro-ranged-4a-golden-longbows.png",
        towerType: "ARCHER",
        buildCost: 275,
    },
    {
        name: "battle-mecha t200",
        kingdom: "KRF",
        imageUrl:
            "https://storage.googleapis.com/kingdom-rush-towers.appspot.com/krf-artillery-4a-battler-mecha-t200.png",
        towerType: "ARTILLERY",
        buildCost: 375,
    },
    {
        name: "arch-druid henge",
        kingdom: "KRO",
        imageUrl:
            "https://storage.googleapis.com/kingdom-rush-towers.appspot.com/kro-artillery-4a-arch-druid-henge.png",
        towerType: "ARTILLERY",
        buildCost: 375,
    },
    {
        name: "melting furnace, 4",
        kingdom: "KRV",
        imageUrl:
            "https://storage.googleapis.com/kingdom-rush-towers.appspot.com/krv-furnace-4.png",
        towerType: "ARTILLERY",
        buildCost: 300,
    },
    {
        name: "goblirangs, 4",
        kingdom: "KRV",
        imageUrl:
            "https://storage.googleapis.com/kingdom-rush-towers.appspot.com/krv-goblirangs-4.png",
        towerType: "ARCHER",
        buildCost: 270,
    },
    {
        name: "dwaarp",
        kingdom: "KRF",
        imageUrl:
            "https://storage.googleapis.com/kingdom-rush-towers.appspot.com/krf-artillery-4b-dwaarp.png",
        towerType: "ARTILLERY",
        buildCost: 400,
    },
    {
        name: "tribal axethrowers",
        kingdom: "KRF",
        imageUrl:
            "https://storage.googleapis.com/kingdom-rush-towers.appspot.com/krf-ranged-4a-tribal-axethrowers.png",
        towerType: "ARCHER",
        buildCost: 230,
    },
]

const KingdomRushTower = ({ data }) => {
    const { name, imageUrl, towerType, buildCost } = data

    return (
        <BorderedDiv
            style={{
                display: "flex",
                borderStyle: "dotted",
                borderRadius: "15px",
                padding: "10px",
                margin: "15px",
                flexWrap: "wrap",
            }}
        >
            <img
                src={imageUrl}
                height="75px"
                width="75px"
                style={{
                    borderRadius: "20%",
                    margin: "5px",
                }}
            />
            <div style={{ margin: "5px 5px" }}>
                <PrettyHeader style={{ fontSize: "20px", margin: "2px" }}>
                    {name}
                </PrettyHeader>

                <div>
                    {towerType}
                    <br />
                    cost: {buildCost}
                </div>
            </div>
        </BorderedDiv>
    )
}

const KingdomRushTowersDisplay = () => {
    const towers = TOWERS.map(tower => <KingdomRushTower key={tower.name} data={tower} />)
    return (
        <div style={{ textAlign: "center" }}>
            <PrettyHeader>Kingdom Rush Towers!</PrettyHeader>
            <span style={{ fontSize: "12px" }}>(TOP)</span>
            {towers}
            <p> There are no more towers to display.</p>
            <span style={{ fontSize: "12px" }}>(BOTTOM)</span>
        </div>
    )
}

export default KingdomRushTowersDisplay
