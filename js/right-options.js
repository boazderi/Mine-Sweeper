'use strict'

// mode btn element 

const gElModeBtn = document.querySelector('.mode-btn')
const gElGameContainer = document.querySelector('.game-container')
const gElStatsContainer = document.querySelector('.stats-container')
const gElOptBtns = document.querySelectorAll('.opt-btn')
const gElOpts = document.querySelectorAll('.opt-el')
const gElStatsItems = document.querySelectorAll('.stats-item')

function changeMode() {
    gGame.isDark = !gGame.isDark
    if (!gGame.isDark) {
        gEllBody.classList.add('light-mode')
        gEllBody.style.backgroundImage = "url('./img/backgroundLight.jpg')"
        gElModeBtn.innerText = 'Dark mode'
        gElGameContainer.style.border = "4px double black"
        gElStatsContainer.style.border = "4px double black"
        for (var i = 0; i < gElOptBtns.length; i++) {
            gElOptBtns[i].style.color = "black"
        }
        for (var i = 0; i < gElStatsItems.length; i++) {
            console.log('gElStatsItems[i]', gElStatsItems[i]);
            gElStatsItems[i].style.border = "4px double black"
        }
        for (var i = 0; i < gElOpts.length; i++) {
            gElOpts[i].style.border = "1px solid black"
        }
    }
    else {
        gEllBody.classList.remove('light-mode')
        gEllBody.style.backgroundImage = "url('./img/background.jpg')"
        gElModeBtn.style.color = "white"
        gElModeBtn.innerText = 'Light mode'
        gElGameContainer.style.border = "4px double white"
        gElStatsContainer.style.border = "4px double white"


        for (var i = 0; i < gElOptBtns.length; i++) {
            gElOptBtns[i].style.color = "white"
        }
        for (var i = 0; i < gElStatsItems.length; i++) {
            console.log('gElStatsItems[i]', gElStatsItems[i]);
            gElStatsItems[i].style.border = "4px double white"
        }
        for (var i = 0; i < gElOpts.length; i++) {
            gElOpts[i].style.border = "1px solid white"
        }
    }
}

function sevenBoom(cells) {
    console.log('sevenBoom function');
    console.log('cells',cells);
    for (var i = 0; i <= cells.length; i++) {
        if ((i+1) % 7 === 0) {
            var cellMine = cells[i]
            cellMine.isMine = true
        }
    }
}