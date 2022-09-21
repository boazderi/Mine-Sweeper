'use strict'

// Model
var gNums = []
var gBoardSize = 0


var gCurrNum = 1
const gGameSound = new Audio('sounds/play-sound.wav')
const gWinningSound = new Audio('sounds/winning-sound.wav')
// Clock model
var gWholeTimer
var gStartTimer 

// Clock elements 
var gElClock = document.querySelector('.clock')
var gElSeconds = document.querySelector('.seconds')
var gElMilisecs = document.querySelector('.milisecs')
var gElWin = document.querySelector('.win')

function createBoard(boardSize) {
    //create nums matrix in the table, and array of numbers
    gBoardSize = boardSize
    var htmlStr = ''

    for (var i = 1; i <= boardSize ** 2; i++) {
        gNums.push(i)
    }

    for (var i = 0; i < boardSize; i++) {
        htmlStr += '<tr>'
        for (var j = 0; j < boardSize; j++) {
            var numCell = gNums.splice(getRandomInteger(0, gNums.length - 1), 1)
            htmlStr += `<td class="btn${numCell}" onclick="cellClicked(${numCell})">${numCell}</td>`
        }
        htmlStr += '</tr>'
    }
    var elTable = document.querySelector('table')
    elTable.innerHTML = htmlStr
}

function cellClicked(clickedNum) {
    // add an boolean before run the clock
    if (gCurrNum === 1) {
        gStartTimer = Date.now()
        runClock()
        gGameSound.play()
    }

    if (clickedNum === gCurrNum) {
        gCurrNum++
        var currCell = document.querySelector(`.btn${clickedNum}`)
        currCell.style.background = "gray"
        currCell.style.color = "white"
    }
}

function runClock() {
    gElClock.classList.remove('hide')

    var clock = setInterval(function () {
        gWholeTimer = Date.now() - gStartTimer
        gElMilisecs.innerText = ((gWholeTimer % 1000) + '').padStart(3, '0')
        gElSeconds.innerText = (Math.floor(gWholeTimer / 1000) + '')
            .padStart(2, '0')

        if (gCurrNum - 1 === gBoardSize ** 2) {
            gElWin.classList.remove('hide')
            var elPlayAgain = document.querySelector('.play-again')
            elPlayAgain.classList.remove('hide')
            gGameSound.pause()
            gWinningSound.play()
            clearInterval(clock)
        }
    }, 29)
}


function PlayAgain(elPlayAgain) {
    gCurrNum = 1
    elPlayAgain.classList.add('hide')
    gWinningSound.pause()
    createBoard(gBoardSize)
    gElWin.classList.add('hide')
    gWholeTimer = 0
}
function getRandomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}