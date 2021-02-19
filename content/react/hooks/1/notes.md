## [The TicTacToe Exercise](https://react-hooks.netlify.app/4)

-   Be able to pause a game, close the tab, and then resume the game later
-   Include a restart button (disabled before starting the game)
-   Display the status of the game (winner, whose turn is it, if the game is finished etc)
-   Be able to keep a history of the game; allow players to go backward and forward in time
-   [Kent's Implementation](https://github.com/kentcdodds/react-hooks/blob/main/src/final/04.extra-3.js)

### My Solution

My top level component manages a simple state:

```jsx
// a `board` is a 9 element array representing the state of the board
// each element representing a square occupied by any of the ff: ['x', 'o', null]
const board0 = ["x", "o", "x", null, "o", null, "x", null, null]

// `boardSnapshots` is a array of boards...
// essentially the history of the game
// `currentSnapshotId` is the index we'll use to
//access our current board state in the boardSnapshots array
const state = {
    boardSnapshots: [board0, board1, board2],
    currentSnapshotId: 1,
}
```

Whenever the state changes we analyze the current board with this helper function:

```jsx
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
```

The top level component

```jsx
const INITIAL_BOARD = [null, null, null, null, null, null, null, null, null]
const INITIAL_STATE = {
    boardSnapshots: [INITIAL_BOARD],
    currentSnapshotId: 0,
}

const App = () => {
    const [state, setState] = useStickyState(INITIAL_STATE, "hooks:tictactoe")

    // changing the state triggers a rerender
    // so we get to analyze the latest board each time
    const { currentSnapshotId, boardSnapshots } = state
    const currentBoard = boardSnapshots[currentSnapshotId]
    const { winnerIfAny, gameFinished, playerToMove } = analyzeBoard(currentBoard)
    const numberOfSnapshots = boardSnapshots.length

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

    let boardStatus = `Player ${playerToMove}, it's your turn!`
    if (gameFinished) {
        boardStatus = winnerIfAny ? `Winner: Player ${winnerIfAny} 🎉🥳` : `Nobody won.`
    }

    return (
        <div>
            <PrettyHeader>{boardStatus}</PrettyHeader>
            <TicTacToeBoard
                {...{ currentBoard, onPlayerMove, disableAll: gameFinished }}
            />
            <MoveHistory
                {...{ numberOfSnapshots, onLoadBoardSnapshot, currentSnapshotId }}
            />
            <ColoredButton disabled={numberOfSnapshots === 1} onClick={onRestart}>
                Restart!
            </ColoredButton>
        </div>
    )
}
```

The clickable tictactoe board

```jsx
const TicTacToeBoard = ({ currentBoard, onPlayerMove, disableAll }) => {
    const square = i => {
        const player = currentBoard[i]
        return (
            <SquareButton
                onClick={() => onPlayerMove(i)}
                disabled={disableAll || player ? true : false}
                aria-label={`TictacToe button # ${i}, occupied by: ${player}`}
            >
                {player ? player : "."}
            </SquareButton>
        )
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
```

The buttons to go back to a previous board state

```jsx
const MoveHistory = ({ numberOfSnapshots, onLoadBoardSnapshot, currentSnapshotId }) => {
    const buttons = Array(numberOfSnapshots)
        .fill(null)
        .map((_, i) => (
            <SquareButton
                key={i}
                aria-label={`go to board state move # ${i}`}
                disabled={i === currentSnapshotId}
                onClick={() => onLoadBoardSnapshot(i)}
            >
                {i}
            </SquareButton>
        ))

    return <div>{buttons}</div>
}
```

### Readings

-   [Kent C Dodds: UseLocalStorage Implementation](https://github.com/kentcdodds/react-hooks/blob/main/src/final/02.extra-4.js)
-   [usehooks.com: useLocalStorage](https://usehooks.com/useLocalStorage/)
-   [donavon/use-persisted-state](https://github.com/donavon/use-persisted-state)
-   [Josh W Comeau: Persisting React State in localStorage](https://www.joshwcomeau.com/react/persisting-react-state-in-localstorage/)
-   [`localStorage` in JavaScript: A complete guide](https://blog.logrocket.com/localstorage-javascript-complete-guide/)
-   [Using custom hooks to reduce component complexity](https://monoglot.dev/articles/using-custom-hooks-to-reduce-component-complexity/)
