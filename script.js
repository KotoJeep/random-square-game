const $start = document.querySelector('#start'),
  $game = document.querySelector('#game'),
  $time = document.querySelector('#time'),
  $input = document.querySelector('#game-time'),
  $resultHeader = document.querySelector('#result-header'),
  $timeHeader = document.querySelector('#time-header'),
  $result = document.querySelector('#result')

let score = 0
let isGameStarted = false

$start.addEventListener('click', startGame)
$game.addEventListener('click', squareClick)
$input.addEventListener('input', setGameTime)

function startGame() {
  score = 0
  setGameTime()
  isGameStarted = true
  hide($start)
  $game.style.backgroundColor = '#fff'
  $time.setAttribute('disabled', 'true')
  
  let interval = setInterval(() => {
    let time = parseFloat($time.textContent)
    
    if (time <= 0) {
      clearInterval(interval)
      endGame()
    } else {
      $time.textContent = (time - 0.1).toFixed(1)
    }
  }, 100)
  
  createSquare()
}

function endGame() {
  isGameStarted = false
  show($start)
  $game.innerHTML = ''
  $game.style.backgroundColor = '#ccc'
  hide($timeHeader)
  show($resultHeader)
  setGameScore()
  $time.removeAttribute('disabled')
}

function show($elem) {
  $elem.classList.remove('hide')
  
}

function hide($elem) {
  $elem.classList.add('hide')
}

function createSquare() {
  $game.innerHTML = ''
  let square = document.createElement('div');
  let squareSize = getRandom(20, 100);
  let gameSize = game.getBoundingClientRect(),
    maxTop = gameSize.height - squareSize,
    maxLeft = gameSize.width - squareSize
  
  square.style.width = square.style.height = `${squareSize}px`
  square.style.position = 'absolute'
  square.style.backgroundColor = `rgb(${getRandom(0, 255)}, ${getRandom(0, 255)}, ${getRandom(0, 255)})`
  square.style.top = `${getRandom(0, maxTop)}px`
  square.style.left = `${getRandom(0, maxLeft)}px`
  square.style.cursor = 'pointer'
  square.setAttribute('data-square', 'true')
  
  $game.insertAdjacentElement('afterbegin', square)
}

function squareClick(event) {
  if (!isGameStarted) {
    return
  }
  if (event.target.dataset.square) {
    score++
    createSquare()
  }
}

function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min) + min)
}

function setGameScore() {
  $result.textContent = score.toString()
}

function setGameTime() {
  let time = +$input.value
  $time.textContent = time.toFixed(1)
  show($timeHeader)
  hide($resultHeader)
}


