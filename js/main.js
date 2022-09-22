'use strict'

// Model

var gBoardSize = 0
var gBoard
const FLAG = '🚩'
const MINE = '💣'
var gGamer = '😃'
var elGamer = document.querySelector('.status')
var gLevel = {
    SIZE: 4,
    MINES: 2
}
elGamer.addEventListener("click", () => restart())
// clock model
var gStartTimer
var gClockInterval


// clock elements
const gElClock = document.querySelector('.clock')
const gElSeconds = document.querySelector('.seconds')

// mines marked counter
const gEllMinersCount = document.querySelector('.miners-span')


// game status
var gGame

function initGame(boardSize, mines) {
    // update elGamer for next restart
    gGame = {
        isOn: false,
        shownCount: 0,
        markedCount: 0,
        secsPassed: 0
    }
    gElSeconds.innerText = 0
    gEllMinersCount.innerText = mines
    elGamer.innerText = gGamer
    gLevel = {
        SIZE: boardSize,
        MINES: mines
    };
    console.log('hello');
    buildBoard(gLevel)
    console.table(gBoard)
    gGame.isOn = true
    // disable right click - don't show the 'context menu' window
    var ellBoard = document.querySelector('.board-container')
    ellBoard.addEventListener("contextmenu", e => e.preventDefault())

}


function buildBoard(level) {
    //create nums matrix in the table, and array of numbers
    var boardSize = level.SIZE
    var minesAmount = level.MINES
    gBoard = []
    var cells = []
    for (var i = 0; i < boardSize; i++) {
        gBoard[i] = []
        var row = gBoard[i]

        for (var j = 0; j < boardSize; j++) {
            var cell = {
                isMine: false,
                minesAroundCount: 0,
                isShown: false,
                isMarked: false
            }
            row[j] = cell
            cells.push(cell)
        }
    }
    for (var i = 0; i < minesAmount; i++) {
        var cellMine = cells.splice((getRandomIntInclusive(0, cells.length - 1)), 1)[0]
        cellMine.isMine = true
    }
    setMinesNegsCount(gBoard)
    renderBoard(gBoard)
}

function setMinesNegsCount(board) {

    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board.length; j++) {
            var cellMinesNegs = countActiveNegs(board, i, j)
            board[i][j].minesAroundCount = cellMinesNegs ? cellMinesNegs : 0
            // console.log('cellMinesNegs',cellMinesNegs);

        }
    }
}

function cellClicked(elCell, i, j, ev) {
    // start the clock if first click
    if (gGame.shownCount === 0 && gGame.markedCount === 0) {
        runClock()
        if (gBoard[i][j].isMine) {
            handleFirstClickMine(elCell, i, j)
        }
    }
    // update the model
    var currCell = gBoard[i][j]
    // check right click
    if (ev.button === 2) {
        currCell.isMarked = true
        cellMarked(elCell)
    } else {
        // if noot right click:
        // update the model
        currCell.isShown = true
        elCell.classList.add('selected')
        // update the dom
        if (currCell.isMine) {
            elCell.innerText = MINE
            // console.log('elCell', elCell);
            elCell.style.background = "crimson"
            gGame.isOn = false
        } else if (!currCell.minesAroundCount) {
            gGame.shownCount++
            expandShown(gBoard, elCell, i, j)
            elCell.innerText = ""
        }
        // if we have an number
        else {
            gGame.shownCount++
            elCell.innerText = currCell.minesAroundCount
        }
    }
    checkGameOver()
}

function handleFirstClickMine(elCell, row, coll) {
    console.log('handleFirstClickMine');
    var noMineCells = []

    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard.length; j++) {
            if (!gBoard[i][j].isMine) noMineCells.push({ cell: gBoard[i][j], i, j })
        }
    }
    var cellForMine = noMineCells[getRandomIntInclusive(0, noMineCells.length - 1)]
    // update model new mine
    cellForMine.cell.isMine = true
    // update dom
    gBoard[row][coll].isMine = false
    // update dom
    elCell.innerText = gBoard[row][coll].minesAroundCount
    setMinesNegsCount(gBoard)
}


function cellMarked(elCell) {
    gGame.markedCount++
    elCell.innerText = FLAG
    if (gLevel.MINES - gGame.markedCount >= 0) gEllMinersCount.
        innerText = gLevel.MINES - gGame.markedCount
}

function expandShown(board, elCell, i, j) {
    console.log('expandShown');
    if (board[i][j].minesAroundCount === 0) {
        elCell.innerText = ''
        elCell.classList.add('zero')
    }
    for (var row = i - 1; row <= i + 1; row++) {
        if (row < 0 || row >= board.length) continue
        var currRow = board[row]

        for (var coll = j - 1; coll <= j + 1; coll++) {
            if (i === row && j === coll) continue
            if (coll < 0 || coll >= board[0].length) continue

            // update the model
            var currCell = currRow[coll]
            if (!currCell.isShown) {
                currCell.isShown = true
                gGame.shownCount++
                // update the dom
                var elCell = document.querySelector(`.cell-${row}-${coll}`)
                elCell.classList.add('selected')
                elCell.innerText = currCell.minesAroundCount ?
                    currCell.minesAroundCount : ''

                if (currCell.minesAroundCount === 0) {
                    elCell.classList.add('zero')
                    expandShown(board, elCell, row, coll)
                }
            }
        }
    }
}

function checkGameOver() {
    if (gGame.isOn === false) {
        console.log('lose!');
        elGamer.innerText = '🤯'
        clearInterval(gClockInterval)

        for (var i = 0; i < gBoard.length; i++) {
            for (var j = 0; j < gBoard.length; j++) {

                if (gBoard[i][j].isMine) {
                    // update the model
                    gBoard[i][j].isShown = true
                    // update the dom
                    var ellTd = document.querySelector(`.cell-${i}-${j}`)
                    ellTd.innerText = MINE
                }
            }
        }
    } else if (gLevel.SIZE ** 2 - gGame.shownCount === gLevel.MINES) {
        console.log('win!')
        elGamer.innerText = '😎'
        gGame.isOn = false
        clearInterval(gClockInterval)
    }
}

function restart() {
    clearInterval(gClockInterval)
    initGame(gLevel.SIZE, gLevel.MINES)
}