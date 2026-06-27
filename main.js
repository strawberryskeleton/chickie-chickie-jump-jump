const scoreDisplay = document.getElementById('score')
const highScoreDisplay = document.getElementById('high-score')
const startScreen = document.getElementById('start-screen')
const endScreen = document.getElementById('end-screen')
const bgDiv = document.getElementById('bg-div')
const cloudDiv = document.getElementById('cloud-div')
const cloud = document.getElementById('cloud')

const jumpSound = new Audio('./assets/jump.mp3')
const crackSound = new Audio('./assets/crunch.mp3')
const loseSound = new Audio('./assets/lose.mp3')

const chickie = document.getElementById('chickie')
const egg = document.getElementById('egg')

const rootFontSize = parseFloat(window.getComputedStyle(document.documentElement).fontSize);
let cloudImgInterval

let score = 0
let scoreTimer

let highScore = localStorage.getItem('highScore')
if (!highScore) {
    highScore = 0
}
// console.log(highScore)

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

    jumpSound.play()

    setTimeout(() => {
        chickie.classList.remove('jump')
    }, 500)

}

function startCollisionCheck () {
    isAlive = setInterval(() => {
        let chickieTop = parseInt(window.getComputedStyle(chickie).getPropertyValue("top"))
        let eggLeft = parseInt(window.getComputedStyle(egg).getPropertyValue("left"))

        let chickieLeftPx = 6 * rootFontSize
        let chickieRightPx = (5+6) * rootFontSize
        let eggWidthtPx = 3 * rootFontSize
        let eggRightPx = eggLeft + eggWidthtPx

        let groundLevel = 23.5 * rootFontSize

        if ((eggRightPx > chickieLeftPx && eggLeft < chickieRightPx) && (chickieTop >= groundLevel)) {
            // alert('game over')
            loseSound.play()
            endGame()
            // egg.classList.remove('moving')
            // clearInterval(isAlive)
            // gameActive = false
        }

    }, 10);
}

function startScoring () {
    scoreTimer = setInterval(() => {
        score++
        scoreDisplay.innerText = score.toString().padStart(4, '0')
    }, 100)

    if (score % 100 == 0) {
        let currentDuration = parseFloat(window.getComputedStyle(egg).animationDuration)

        if (currentDuration > 1.0) {
            egg.style.animationDuration = (currentDuration - 0.2) + 's'
        }
    }
}

function cloudChange () {
    let cloudImages = ['./assets/cloud1.png', './assets/cloud2.png', './assets/cloud3.png', './assets/cloud4.png']

    cloudImgInterval = setInterval(() => {
        let randomIndex = Math.floor(Math.random() * cloudImages.length)

        cloud.setAttribute('src', cloudImages[randomIndex])
    }, 8000)
}



function startGame () {
    startScreen.classList.add('hidden')
    endScreen.classList.add('hidden')

    bgDiv.style.backgroundPosition = "";
    bgDiv.classList.add('bg-moving')
    cloudDiv.classList.add('cloud-moving')
    
    score = 0
    scoreDisplay.innerText = score
    highScoreDisplay.innerText = highScore.toString().padStart(4, '0')
    bgDiv.style.backgroundPosition = "";

    egg.style.left = ""
    egg.setAttribute('src', './assets/egg.png')
    egg.classList.add('moving')
    egg.style.animationDuration = '3s'

    gameActive = true
    startCollisionCheck()
    startScoring()
    cloudChange()
}

function endGame () {
    gameActive = false

    bgDiv.classList.remove('bg-moving')
    cloudDiv.classList.remove('cloud-moving')
    // egg.innerHTML = `<img src="./assets/egg_broken.png" alt="egg broken" id="egg" />`
    let currentEggLeft = window.getComputedStyle(egg).getPropertyValue('left')
    egg.style.left = currentEggLeft

    egg.classList.remove('moving')
    crackSound.play()
    egg.setAttribute('src', './assets/egg_broken.png')

    endScreen.classList.remove('hidden')
    clearInterval(isAlive)
    clearInterval(scoreTimer)

    if (score > highScore) {
        highScore = score
        localStorage.setItem('highScore', highScore)
    }

}