import { useVirtual } from "react-virtual"
import { useRef, useState, useCallback } from "react"
import faker from "faker"
import { PrettyHeader, BorderedDiv } from "components/pretty-defaults"
import { ColoredButton } from "components/button"

function RowVirtualizerDynamic({ rows }) {
    const parentRef = useRef()
    const rowVirtualizer = useVirtual({ size: rows.length, parentRef })
    const [randomNumber, setRandomNumber] = useState(() =>
        Math.floor(Math.random() * rows.length)
    )

    const handleClick = useCallback(() => {
        rowVirtualizer.scrollToIndex(randomNumber)
        setRandomNumber(Math.floor(Math.random() * rows.length))
    }, [randomNumber, rowVirtualizer, rows.length])

    return (
        <>
            <ColoredButton onClick={handleClick} style={{ margin: "10px auto" }}>
                Scroll to: {randomNumber}
            </ColoredButton>
            <BorderedDiv>
                <div
                    ref={parentRef}
                    className="List"
                    style={{
                        height: `300px`,
                        width: "100%",
                        overflow: "auto",
                        maxWidth: "100%",
                        padding: "20px",
                    }}
                >
                    <div
                        style={{
                            height: `${rowVirtualizer.totalSize}px`,
                            width: "100%",
                            position: "relative",
                        }}
                    >
                        {rowVirtualizer.virtualItems.map(virtualRow => (
                            <div
                                key={virtualRow.index}
                                ref={virtualRow.measureRef}
                                style={{
                                    position: "absolute",
                                    top: 0,
                                    left: 0,
                                    width: "100%",
                                    transform: `translateY(${virtualRow.start}px)`,
                                    display: "flex",
                                    justifyContent: "center",
                                }}
                            >
                                <div
                                    style={{
                                        width: "100%",
                                        margin: "10px",
                                        padding: "20px",
                                        borderColor:
                                            virtualRow.index % 2 ? "hotpink" : "violet",
                                        borderWidth: "1px",
                                        borderStyle: "dashed",
                                        borderRadius: "15px",
                                    }}
                                >
                                    <PrettyHeader style={{ fontSize: "25px" }}>
                                        # {virtualRow.index}
                                    </PrettyHeader>
                                    {rows[virtualRow.index]}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </BorderedDiv>
        </>
    )
}

function ColumnVirtualizerDynamic({ columns }) {
    const parentRef = useRef()

    const columnVirtualizer = useVirtual({
        horizontal: true,
        size: columns.length,
        parentRef,
    })
    const [randomNumber, setRandomNumber] = useState(() =>
        Math.floor(Math.random() * columns.length)
    )

    const handleClick = useCallback(() => {
        columnVirtualizer.scrollToIndex(randomNumber)
        setRandomNumber(Math.floor(Math.random() * columns.length))
    }, [randomNumber, columnVirtualizer, columns.length])

    return (
        <>
            <ColoredButton onClick={handleClick} style={{ margin: "10px auto" }}>
                Scroll to: {randomNumber}
            </ColoredButton>
            <BorderedDiv>
                <div
                    ref={parentRef}
                    className="List"
                    style={{
                        width: "100%",
                        height: "80px",
                        overflow: "auto",
                    }}
                >
                    <div
                        style={{
                            width: `${columnVirtualizer.totalSize}px`,
                            height: "100%",
                            position: "relative",
                        }}
                    >
                        {columnVirtualizer.virtualItems.map(virtualColumn => (
                            <div
                                key={virtualColumn.index}
                                ref={virtualColumn.measureRef}
                                style={{
                                    position: "absolute",
                                    top: 0,
                                    left: 0,
                                    height: "100%",
                                    width: `${columns[virtualColumn.index]}px`,
                                    transform: `translateX(${virtualColumn.start}px)`,
                                }}
                            >
                                <div
                                    style={{
                                        margin: "10px",
                                        padding: "20px",
                                        borderColor:
                                            virtualColumn.index % 2
                                                ? "hotpink"
                                                : "violet",
                                        borderWidth: "1px",
                                        borderStyle: "dashed",
                                        borderRadius: "15px",
                                    }}
                                >
                                    <PrettyHeader style={{ fontSize: "15px" }}>
                                        {virtualColumn.index} :{" "}
                                        {columns[virtualColumn.index]}
                                    </PrettyHeader>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </BorderedDiv>
        </>
    )
}

const App = () => {
    const rows = new Array(10000)
        .fill(true)
        .map(() => faker.lorem.lines(Math.random() * 10))

    const columns = new Array(10000).fill(true).map(() => faker.name.findName())

    return (
        <>
            <RowVirtualizerDynamic rows={rows} />
            <ColumnVirtualizerDynamic columns={columns} />
        </>
    )
}

export default App
