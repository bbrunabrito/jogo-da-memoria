let firstScreen = document.querySelector('.principal')
let gameScreen = document.querySelector('.game')

let start = document.getElementById('start')

let themeSound = document.getElementById('principal')

start.addEventListener('click', function() {
    startGame()

    themeSound.pause()

    firstScreen.style.display = 'none'
    gameScreen.style.display = 'block'
})