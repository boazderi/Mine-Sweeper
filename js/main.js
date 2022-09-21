'use strict'

// Model

var gBoardSize = 0
var gBoard
const FLAG = '🚩'
const MINE = '💣'
var gLevel = {
    SIZE: 4,
    MINES: 2
}
// clock model
var gStartTimer
var gClock


// clock elements
const gElClock = document.querySelector('.clock')
const gElSeconds = document.querySelector('.seconds')

var gGame = {
    isOn: false,
    shownCount: 0,
    markedCount: 0,
    secsPassed: 0
}

function initGame(boardSize, mines) {
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
    for(var i = 0 ; i < minesAmount ; i++){
        var cellRandIdx = getRandomIntInclusive(0, cells.length)
        cells[cellRandIdx].isMine = true
    }
    setMinesNegsCount(gBoard)
    renderBoard(gBoard)
}

function setMinesNegsCount(board) {

    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board.length; j++) {
            if (!board[i][j].isMine) {
                var cellMinesNegs = countActiveNegs(board, i, j)
                board[i][j].minesAroundCount = cellMinesNegs ? cellMinesNegs : 0
                // console.log('cellMinesNegs',cellMinesNegs);
            }
        }
    }
}

function cellClicked(elCell, i, j, ev) {
    // start the clock if first click
    if (gGame.shownCount === 0 && gGame.markedCount === 0) runClock()
    // update the model
    var currCell = gBoard[i][j]
    if (ev.button === 2) {
        currCell.isMarked = true
        cellMarked(elCell)
    } else {
        // console.log('elCell.button', elCell);
        currCell.isShown = true

        // update the dom
        if (currCell.isMine) {
            elCell.innerText = MINE
            gGame.isOn = false
        } else if (!currCell.minesAroundCount) {
            gGame.shownCount++
            expandShown(gBoard, elCell, i, j)
            elCell.innerText = currCell.minesAroundCount
        }
        // if we have an number
        else {
            gGame.shownCount++
            elCell.innerText = currCell.minesAroundCount
        }
    }
    checkGameOver()
}

function cellMarked(elCell) {
    gGame.markedCount++
    elCell.innerText = FLAG
}

function expandShown(board, elCell, i, j) {
    console.log('expandShown');
    var expendsAgain = []
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
            }
            // update the dom
            var elCell = document.querySelector(`.cell-${row}-${coll}`)
            elCell.innerText = currCell.minesAroundCount
        }
    }
}

function checkGameOver() {
    if (gGame.isOn === false) {
        console.log('lose!');
        clearInterval(gClock)

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
    } else if (gGame.markedCount + gGame.shownCount
        === gLevel.SIZE ** 2) {
        console.log('win!')
        gGame.isOn = false
        clearInterval(gClock)
    }

}
