import { cloneElement } from "react"
import { ColoredButton } from "components/button"
import {
    BorderedDiv,
    PrettyHeader,
    RoundedImage,
    SmallSpan,
} from "components/pretty-defaults"
import { useTheme } from "hooks"
import { SpinnerDots } from "components/spinner"

const TOTALLY_CENTERED = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    textAlign: "center",
}

const Heading = ({ children, id }) => {
    return (
        <PrettyHeader style={{ fontSize: "30px" }}>
            {children} <sup style={{ fontSize: "20px" }}>({id || "xxx"})</sup>
        </PrettyHeader>
    )
}

const SquareSpace = ({ children, style }) => {
    return (
        <BorderedDiv
            style={{
                width: "200px",
                minHeight: "200px",
                ...TOTALLY_CENTERED,
                ...style,
            }}
        >
            {children}
        </BorderedDiv>
    )
}

const AbilityTable = ({ children, style }) => {
    style = { padding: "5px", minWidth: "75px", textAlign: "center", ...style }
    const Td = ({ children }) => (
        <td {...{ style }}>
            <SmallSpan>{children}</SmallSpan>
        </td>
    )

    let tableBody =
        children &&
        children.map(abilityData => {
            const { name, type, damage } = abilityData
            return (
                <tr key={name}>
                    <Td>{name}</Td>
                    <Td>{type}</Td>
                    <Td>{damage}</Td>
                </tr>
            )
        })

    tableBody = tableBody || (
        <tr>
            <Td>-</Td>
            <Td>-</Td>
            <Td>-</Td>
        </tr>
    )

    return (
        <table>
            <thead>
                <tr {...{ style }}>
                    <PrettyHeader Component="th">Ability</PrettyHeader>
                    <PrettyHeader Component="th">Type</PrettyHeader>
                    <PrettyHeader Component="th">Damage</PrettyHeader>
                </tr>
            </thead>
            <tbody>{tableBody}</tbody>
        </table>
    )
}

const PokemonDataView = ({ children, borderColor, borderStyle }) => {
    const { primaryColor } = useTheme()
    let squareSpace = null
    let abilityTable = null
    let heading = null

    borderColor = borderColor || primaryColor
    borderStyle = borderStyle || "dashed"
    let borderWidth = "1px"
    let border = { borderWidth, borderColor, borderStyle }

    for (let child in children) {
        if (children[child].type === Heading) {
            heading = children[child]
        }
        if (children[child].type === SquareSpace) {
            squareSpace = cloneElement(children[child], {
                style: border,
            })
        } else if (children[child].type === AbilityTable) {
            abilityTable = cloneElement(children[child], {
                style: {
                    borderBottomColor: borderColor,
                    borderBottomStyle: borderStyle,
                    borderWidth,
                },
            })
        }
    }

    return (
        <BorderedDiv
            style={{ padding: "20px", margin: "10px", ...TOTALLY_CENTERED, ...border }}
        >
            {heading} {squareSpace} {abilityTable}
        </BorderedDiv>
    )
}

const PokemonLoadingView = ({ pokemonName }) => {
    return (
        <PokemonDataView>
            <Heading>{`Loading ${pokemonName.slice(0, 7)}...`}</Heading>
            <SquareSpace>
                <SpinnerDots />
            </SquareSpace>
            <AbilityTable />
        </PokemonDataView>
    )
}

const PokemonIdleView = () => {
    return (
        <PokemonDataView>
            <Heading>No Pokemon Yet!</Heading>
            <SquareSpace>Please submit a pokemon!</SquareSpace>
            <AbilityTable />
        </PokemonDataView>
    )
}

function PokemonErrorView({ error, resetFunction }) {
    return (
        <PokemonDataView borderColor="red">
            <Heading>Error! :(</Heading>
            <SquareSpace>
                <SmallSpan role="alert">
                    {error.message}
                    <ColoredButton
                        onClick={resetFunction}
                        style={{ backgroundColor: "red", margin: "5px auto" }}
                    >
                        Try again
                    </ColoredButton>
                    This error was caught by the error boundary!
                </SmallSpan>
            </SquareSpace>
            <AbilityTable />
        </PokemonDataView>
    )
}

const PokemonInfoView = ({ pokemonData }) => {
    const { imageUrl, name, number, abilities } = pokemonData
    return (
        <PokemonDataView borderStyle="solid">
            <Heading id={number}>{name}</Heading>
            <SquareSpace>
                <RoundedImage
                    src={imageUrl}
                    alt={name}
                    height={180}
                    width={180}
                    borderType={"border15px"}
                />
            </SquareSpace>
            <AbilityTable>{abilities}</AbilityTable>
        </PokemonDataView>
    )
}

export { PokemonIdleView, PokemonInfoView, PokemonLoadingView, PokemonErrorView }
