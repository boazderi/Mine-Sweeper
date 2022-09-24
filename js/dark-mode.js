'use strict'

// mode btn element 

const gElModeBtn = document.querySelector('.mode-btn')

function changeMode() {
    gGame.isDark = !gGame.isDark
    if (!gGame.isDark) {
        gEllBody.classList.add('light-mode')
        gEllBody.style.backgroundImage = "url('./img/backgroundLight.jpg')"
        gElModeBtn.style.color = "black"
        gElModeBtn.innerText = 'Dark mode'

    }
    else {
        gEllBody.classList.remove('light-mode')
        gEllBody.style.backgroundImage = "url('./img/background.jpg')"
        gElModeBtn.style.color = "white"
        gElModeBtn.innerText = 'Light mode'
    }

}