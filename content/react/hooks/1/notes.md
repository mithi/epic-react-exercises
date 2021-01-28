## [The TicTacToe Exercise](https://react-hooks.netlify.app/4)

-   Be able to pause a game, close the tab, and then resume the game later
-   Include a restart button (disabled before starting the game)
-   Display the status of the game (winner, who's turn is it, if the game is finished etc)
-   Be able to keep a history of the game; allow players to go backward and forward in time
-   [Kent's Implementation](https://github.com/kentcdodds/react-hooks/blob/main/src/final/04.extra-3.js)
-   [My Implementation](https://github.com/mithi/epic-notes/blob/main/content/react/hooks/1/app.js)

## My Implementation

My top level component basically renders the following:

```js
// info about the current state of the board)
<BoardStatus {...{ winnerIfAny, gameFinished, playerToMove }} />
// `Board` is the clickable board
<Board {...{ currentBoard, onPlayerMove, disableButtons: gameFinished }} />
// buttons that you can click to move forward and backward in time
<MoveHistory {...{ numberOfSnapshots, onLoadBoardSnapshot, currentSnapshotId }} />
<RestartButton {...{ onRestart: restart }} />

```

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

```js
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

Putting everything together, this is the result:

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

    const restart = numberOfSnapshots === 1 ? null : onRestart
    return (
        <>
            <BoardStatus {...{ winnerIfAny, gameFinished, playerToMove }} />
            <Board {...{ currentBoard, onPlayerMove, disableButtons: gameFinished }} />
            <MoveHistory
                {...{ numberOfSnapshots, onLoadBoardSnapshot, currentSnapshotId }}
            />
            <RestartButton {...{ onRestart: restart }} />
        </>
    )
}
```

# END
