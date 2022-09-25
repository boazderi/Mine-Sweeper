'use strict'

function handleHint(rowIdx, colIdx) {
    // this function take cell element and idx's, create array
    // of cells and show for 1 second 
    console.log('gGame', gGame);
    gGame.hints--
    gEllHint.innerText = gGame.hints
    gHintElements = []
    console.log('gGame.hints', gGame.hints);
    for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
        if (i < 0 || i >= gBoard.length) continue
        console.log('firstloop');
        for (var j = colIdx - 1; j <= colIdx + 1; j++) {
            if (j < 0 || j >= gBoard[0].length) continue
            // update the model
            var currCell = gBoard[i][j]
            if (!currCell.isShown && !currCell.isMarked) {
                // currCell.isShown = true
                // gGame.shownCount++
                // update the dom
                var elCell = document.querySelector(`.cell-${i}-${j}`)
                if (currCell.isMine) elCell.innerText = MINE
                else {
                    elCell.innerText = currCell.minesAroundCount ?
                        currCell.minesAroundCount : ''
                }
                if (currCell.minesAroundCount === 0 && !currCell.isMine) {
                    elCell.classList.add('zero')
                }
                gHintElements.push(elCell)
            }
        }
    }
    setTimeout(() => {
        for (var i = 0; i < gHintElements.length; i++) {
            if (gHintElements[i].innerText === "") {
                gHintElements[i].classList.remove('zero')
            }
            gHintElements[i].innerText = ""
        }
    }, 1000)
}

// safe click span

function safeClick() {
    if (!gGame.safeClicks) {
        return
    }
    gGame.safeClicks--
    gEllSafeCounter.innerText = gGame.safeClicks
    var noMineAndFreeCells = []
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard.length; j++) {
            if (!gBoard[i][j].isMine &&
                !gBoard[i][j].isShown && !gBoard[i][j].isMarked)
                noMineAndFreeCells.push({ cell: gBoard[i][j], i, j })
        }
    }
    var safePosition = noMineAndFreeCells[getRandomIntInclusive(0, noMineAndFreeCells.length - 1)]
    var elSafeCell = document.querySelector(`.cell-${safePosition.i}-${safePosition.j}`)
    elSafeCell.innerText = 'V'
}