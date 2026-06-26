const scoreDisplay = document.getElementById('score')
const startScreen = document.getElementById('start-screen')
const endScreen = document.getElementById('end-screen')

const chickie = document.getElementById('chickie')
const egg = document.getElementById('egg')

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