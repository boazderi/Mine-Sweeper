'use strict'

function handleHint(rowIdx, colIdx) {
    // this function take cell element and idx's, create array
    // of cells and show for 1 second 
    gGame.hints--
    gEllHint.innerText = gGame.hints
    gHintElements = []
    for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
        if (i < 0 || i >= gBoard.length) continue
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

function undo(){
    if (!gGame.lastMoves.length) return
    var lastMove = gGame.lastMoves.pop()
    if (typeof lastMove.length === 'number') {
        // if its zero with expend shown
        for(var i = 0 ; i < lastMove.length ; i++){
            var currMove = lastMove[i]
            // update the model
            currMove.currCell.isShown = false
            gGame.shownCount--
            // update dom
            currMove.elCell.innerText = ""
            if (!currMove.currCell.minesAroundCount) {
                currMove.elCell.classList.remove("zero")
            }
        }
    }
    else if (!lastMove.rightClick){
        // if its not right click
        // if its an number
        if (lastMove.currCell.minesAroundCount && !lastMove.currCell.isMine){
            // update model
            lastMove.currCell.isShown = false
            gGame.shownCount--
            // update dom
            lastMove.elCell.innerText = ""
        } else if (lastMove.currCell.isMine) {
            // if its a mine
            // update model
            lastMove.currCell.isShown = false
            // update dom
            lastMove.elCell.innerText = ""
            lastMove.elCell.classList.remove('mine-clicked')
        } 
    }
    else {
        // if its right click
        // update model
        gGame.markedCount--
        lastMove.currCell.isMarked = false
        
        // update the dom
        lastMove.elCell.innerText = lastMove.rightClick ? "" : FLAG
        gEllMinersCount.
            innerText = gLevel.MINES - gGame.markedCount
    }
    // cellClicked(gGame.moves)
}