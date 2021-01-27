import { useState } from "react"
const X_PLAYER = "x"
const O_PLAYER = "o"

const Board = ({ currentBoard, onPlayerMove, disableButtons }) => {
    const square = i => {
        const x = currentBoard[i]
        const disabled = disableButtons || x ? true : false
        const onClick = disabled ? null : () => onPlayerMove(i)
        return <button {...{ onClick, disabled }}>{x ? x : "."}</button>
    }
    return (
        <table>
            <tbody>
                <tr>
                    <td>{square(0)}</td>
                    <td>{square(1)}</td>
                    <td>{square(2)}</td>
                </tr>
                <tr>
                    <td>{square(3)}</td>
                    <td>{square(4)}</td>
                    <td>{square(5)}</td>
                </tr>
                <tr>
                    <td>{square(6)}</td>
                    <td>{square(7)}</td>
                    <td>{square(8)}</td>
                </tr>
            </tbody>
        </table>
    )
}

/*

    +---+---+---+
    | 0 | 1 | 2 |
    +---+---+---+
    | 3 | 4 | 5 |
    +---+---+---+
    | 6 | 7 | 8 |
    +---+---+---+

*/

const STREAKS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
]

// a board is a 9 element array representing the state of the board
// each element representing a square occupied by any of the ff: ['x', 'o', null]
const analyzeBoard = board => {
    // 1. check if there is a winning streak, and if so, which player, return
    for (const streak of STREAKS) {
        const [a, b, c] = streak.map(i => board[i])
        if (a !== null && a === b && b === c) {
            return { gameFinished: true, winnerIfAny: a, playerToMove: null }
        }
    }

    // 2. if no winning streak, check if the board has been fully occupied
    const occupiedSquaresLength = board.filter(x => x !== null).length
    if (occupiedSquaresLength === board.length) {
        return { gameFinished: true, winnerIfAny: null, playerToMove: null }
    }

    // 3. if the board is not fully occupied, check whose turn it is
    const playerToMove = occupiedSquaresLength % 2 === 0 ? X_PLAYER : O_PLAYER
    return { gameFinished: false, winnerIfAny: null, playerToMove }
}

const BoardStatus = ({ winnerIfAny, gameFinished, playerToMove, onRestart }) => {
    return (
        <>
            <p>winnerIfAny: {winnerIfAny ? winnerIfAny : "pending"}</p>
            <p>gameFinished: {gameFinished ? "true" : "false"}</p>
            <p>playerToMove: {playerToMove ? playerToMove : "none"}</p>
            <button onClick={onRestart}>restart</button>
        </>
    )
}

const MoveHistory = ({ numberOfSnapshots, onLoadBoardSnapshot, currentSnapshotId }) => {
    const buttons = Array(numberOfSnapshots)
        .fill(null)
        .map((_, i) => {
            const disabled = i === currentSnapshotId
            const onClick = disabled ? null : () => onLoadBoardSnapshot(i)
            return <button {...{ key: i, onClick, disabled }}>{i}</button>
        })

    return (
        <>
            <p>Click the which move to go back to: </p>
            {buttons}
        </>
    )
}

const INITIAL_BOARD = [null, null, null, null, null, null, null, null, null]
const INITIAL_STATE = {
    boardSnapshots: [INITIAL_BOARD],
    currentSnapshotId: 0,
}

const App = () => {
    const [state, setState] = useState(INITIAL_STATE)

    // changing the state of the same triggers a rerender
    // so we get to analyze the latest board each time
    const { currentSnapshotId, boardSnapshots } = state
    const currentBoard = boardSnapshots[currentSnapshotId]
    const numberOfSnapshots = boardSnapshots.length
    const { winnerIfAny, gameFinished, playerToMove } = analyzeBoard(currentBoard)

    const onPlayerMove = squareId => {
        // all occupied squares are disabled at this point
        // so when this callback is fired
        // it's safe to assume that this is a valid move
        // bottomline: no need to check.
        let nextBoard = currentBoard.slice()
        nextBoard[squareId] = playerToMove
        const nextBoardSnapshots = [
            ...boardSnapshots.slice(0, currentSnapshotId + 1),
            nextBoard,
        ]
        setState({
            boardSnapshots: nextBoardSnapshots,
            currentSnapshotId: currentSnapshotId + 1,
        })
    }

    const onLoadBoardSnapshot = snapShotId =>
        setState({ ...state, currentSnapshotId: snapShotId })

    const onRestart = () => setState(INITIAL_STATE)
    return (
        <div>
            <Board {...{ currentBoard, onPlayerMove, disableButtons: gameFinished }} />
            <BoardStatus {...{ winnerIfAny, gameFinished, playerToMove, onRestart }} />
            <MoveHistory
                {...{ numberOfSnapshots, onLoadBoardSnapshot, currentSnapshotId }}
            />
        </div>
    )
}

export default App
