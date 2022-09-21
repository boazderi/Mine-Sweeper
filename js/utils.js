function renderBoard(mat) {

    var strHTML = '<table border="2"><tbody>'
    for (var i = 0; i < mat.length; i++) {

        strHTML += '<tr>'
        for (var j = 0; j < mat[0].length; j++) {

            const className = 'cell cell-' + i + '-' + j
            strHTML += `<td class="${className}" onmousedown="cellClicked(this, ${i}, ${j}, event)" cellMarked(elCell)></td>`
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
    // console.log('count',count);
    return count
}

function runClock(){
    gStartTimer = Date.now()
    gElClock.classList.remove('hide')
    gClock = setInterval(function (){
        gGame.secsPassed = (Math.floor((Date.now() - gStartTimer) / 1000)+'').padStart(2, 0)
        gElSeconds.innerText = gGame.secsPassed
    },1000)
}