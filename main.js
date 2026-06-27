const scoreDisplay = document.getElementById('score')
const startScreen = document.getElementById('start-screen')
const endScreen = document.getElementById('end-screen')

const chickie = document.getElementById('chickie')
const egg = document.getElementById('egg')

const rootFontSize = parseFloat(window.getComputedStyle(document.documentElement).fontSize);

let score = 0
let gameActive = true
// let lastTime = null

document.addEventListener('keydown', (ev) => {
//   console.log(ev.key);
  
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

const isAlive = setInterval(() => {
    let chickieTop = parseInt(window.getComputedStyle(chickie).getPropertyValue("top"))
    let eggLeft = parseInt(window.getComputedStyle(egg).getPropertyValue("left"))

    let chickieLeftPx = 5 * rootFontSize
    let chickieRightPx = (5+6) * rootFontSize
    let eggLeftPx = 5 * rootFontSize
    let eggRightPx = eggLeft + (3 * rootFontSize)

    let groundLevel = 23.5 * rootFontSize

    if ((eggRightPx > chickieLeftPx && eggLeft < chickieRightPx) && (chickieTop >= groundLevel)) {
        alert('game over')
        egg.style.animation = 'none'
        clearInterval(isAlive)
        gameActive = false
    }

}, 10);