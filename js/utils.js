'use strict'

function renderBoard(mat) {

    var strHTML = '<table border="2"><tbody>'
    for (var i = 0; i < mat.length; i++) {

        strHTML += '<tr>'
        for (var j = 0; j < mat[0].length; j++) {

            const className = 'cell cell-' + i + '-' + j
            strHTML += `<td class="${className}" 
            onmousedown="cellClicked(this, ${i}, ${j}, event)"></td>`
        }
        strHTML += '</tr>'
    }
    strHTML += '</tbody></table>'
    // catch the div with the class "board-container" and asign 
    // the innerHtml to it.

    const elContainer = document.querySelector(".board-container")
    elContainer.innerHTML = strHTML
}

function getRandomIntInclusive(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}


function countActiveNegs(board, rowIdx, colIdx) {
    var count = 0

    for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
        if (i < 0 || i >= board.length) continue

        for (var j = colIdx - 1; j <= colIdx + 1; j++) {
            if (i === rowIdx && j === colIdx) continue
            if (j < 0 || j >= board[0].length) continue
            if (board[i][j].isMine) count++
        }
    }
    return count
}

function runClock() {
    gStartTimer = Date.now()
    gClockInterval = setInterval(function () {
        gGame.secsPassed = (Math.floor((Date.now() - gStartTimer) / 1000))
        gElSeconds.innerText = gGame.secsPassed
    }, 1000)
}

function paintBoard(board) {

    for (var i = 0; i < board.length; i++) {

        for (var j = 0; j < board.length; j++) {
            var currCell = board[i][j]
            var elCell = document.querySelector(`.cell-${i}-${j}`)
            if (currCell.isMine || !elCell.innerText) continue

            var numPaint = choosePaint(elCell.innerText)
            elCell.style.color = numPaint
        }
    }
}


function choosePaint(num) {
    var currNum = +num
    var numColor
    switch (currNum) {
        case 1:
            numColor = "blue"
            break;
        case 2:
            numColor = "green"
            break;
        case 3:
            numColor = "red"
            break;
        case 4:
            numColor = "darkblue"
            break;
        case 5:
            numColor = "indigo"
            break;
        case 6:
            numColor = "darkcyan"
            break;
        case 7:
            numColor = "black"
            break;
        case 8:
            numColor = "darkgray"
            break;

        default:
            break;
    }
    return numColor
}