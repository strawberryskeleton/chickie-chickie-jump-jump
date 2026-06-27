const scoreDisplay = document.getElementById('score')
const startScreen = document.getElementById('start-screen')
const endScreen = document.getElementById('end-screen')

const chickie = document.getElementById('chickie')
const egg = document.getElementById('egg')

const rootFontSize = parseFloat(window.getComputedStyle(document.documentElement).fontSize);

let score = 0
let gameActive = false
let isAlive
// let lastTime = null

document.addEventListener('keydown', (ev) => {
//   console.log(ev.key);

  if(!gameActive) {
    startGame()
  }
  
  if (gameActive && ev.code === 'Space') {
    jump()
  }

});

// function update (time) {
//     if (lastTime == null) {
//         lastTime = time
//         window.requestAnimationFrame(update)
//         return
//     }

//     const delta = time - lastTime
//     // console.log(delta)
    
//     lastTime = time
//     window.requestAnimationFrame(update)
// }

// window.requestAnimationFrame(update)

function jump () {
    if (chickie.classList.contains('jump')) {
        return
    }

    chickie.classList.add('jump')

    setTimeout(() => {
        chickie.classList.remove('jump')
    }, 500)
}

function startCollisionCheck () {
    isAlive = setInterval(() => {
        let chickieTop = parseInt(window.getComputedStyle(chickie).getPropertyValue("top"))
        let eggLeft = parseInt(window.getComputedStyle(egg).getPropertyValue("left"))

        let chickieLeftPx = 5 * rootFontSize
        let chickieRightPx = (5+6) * rootFontSize
        let eggLeftPx = 3 * rootFontSize
        let eggRightPx = eggLeft + (3 * rootFontSize)

        let groundLevel = 23.5 * rootFontSize

        if ((eggRightPx > chickieLeftPx && eggLeft < chickieRightPx) && (chickieTop >= groundLevel)) {
            // alert('game over')
            endGame()
            // egg.classList.remove('moving')
            clearInterval(isAlive)
            // gameActive = false
        }

    }, 10);
}

function startGame () {
    startScreen.classList.add('hidden')
    endScreen.classList.add('hidden')
    score = 0
    scoreDisplay.innerText = score

    egg.classList.add('moving')

    gameActive = true
    startCollisionCheck()
}

function endGame () {
    gameActive = false
    egg.classList.remove('moving')
    endScreen.classList.remove('hidden')
    clearInterval(isAlive)
}