import swal from 'sweetalert2'
const degToRad = (angle) => ((angle * Math.PI) / 180)

class Snake {
  constructor(x, y, angle, length, ctx) {
    this.x = x
    this.y = y
    this.angle = angle
    this.length = length
    this.ctx = ctx
    this.coordinates = []
  }

  draw() {
    this.ctx.beginPath()
    let snakeImg = document.getElementById("snake-img")
    let pattern = this.ctx.createPattern(snakeImg, 'repeat')
    this.ctx.fillStyle = pattern
    this.ctx.arc(this.x, this.y, Snake.HEAD_RADIUS, 0, 2 * Math.PI)
    this.ctx.fill()
    this.ctx.closePath()
  }

  running(canvasSize, game) {
    const radian = degToRad(this.angle)
    this.x += Snake.SPEED * Math.cos(radian)
    this.y += Snake.SPEED * Math.sin(radian)
    this.validationCoordinates(canvasSize, game)
    this.pushCoordinates()
    this.draw()
    this.findSnakeСollision(game)
  }

  pushCoordinates() {
    this.coordinates.push({
      x: this.x,
      y: this.y,
    })
    this.snakeLengthControl()
  }

  directionControl(e) {
    switch(e.keyCode) {
      case 37: {
        this.turnLeft()
        break
      }
      case 39: {
        this.turnRight()
        break
      }
    }
  }

  turnLeft() {
    this.angle -= Snake.ROTATION_SPEED
  }

  turnRight() {
    this.angle += Snake.ROTATION_SPEED
  }

  snakeLengthControl() {
    if (this.coordinates.length > this.length) {
      const { x, y } = this.coordinates[0]
      this.ctx.beginPath()
      this.ctx.fillStyle = '#fff'
      this.ctx.arc(x, y, Snake.HEAD_RADIUS + 2, 0, 2 * Math.PI)
      this.ctx.fill()
      this.ctx.closePath()
      this.coordinates.shift()
    }
  }

  validationCoordinates({mapW, mapH}, game) {
    if (
      (this.x < 0) || (this.x > mapW) ||
      (this.y < 0) || (this.y > mapH)
    ) {
      finishGame(game)
    }
  }

  findSnakeСollision(game) {
    this.coordinates.slice(0, -Snake.HEAD_RADIUS).forEach(({x, y}) => {
      const distance = Math.sqrt(((x - this.x) ** 2) + ((y - this.y) ** 2))
      if (distance < Snake.HEAD_RADIUS + 2) {
        finishGame(game)
      }
    })
  }
}

Snake.COLOR = '#64C6DC'
Snake.INITIAL_LENGTH = 100
Snake.HEAD_RADIUS = 6
Snake.SPEED = 2
Snake.ROTATION_SPEED = 18

class Food {
  constructor(x, y, color, ctx) {
    this.x = x
    this.y = y
    this.color = color
    this.draw(ctx)
  }

  draw(ctx) {
    ctx.beginPath()
    ctx.fillStyle = this.color
    ctx.arc(this.x, this.y, Food.RADIUS, 0, 2 * Math.PI)
    ctx.fill()
    ctx.closePath()
  }

  destroy(ctx) {
    ctx.beginPath()
    ctx.fillStyle = '#fff'
    ctx.strokeStyle = '#fff'
    ctx.arc(this.x, this.y, Food.RADIUS, 0, 2 * Math.PI)
    ctx.fill()
    ctx.stroke()
    ctx.closePath()
  }
}
Food.RADIUS = 6

const maxAmountOfFood = 100
const foodGeneration = (foods = [], ctx) => {
  let diff = maxAmountOfFood - foods.length
  while (diff > 0) {
    const x = (Math.random() * 600) >> 0
    const y = (Math.random() * 600) >> 0
    const color = '#'+((1 << 24) * Math.random()|0).toString(16)
    const food = new Food(x, y, color, ctx)
    foods.push(food)
    diff--
  }
  setInterval(() => {
    let diff = Math.floor(Math.random() * 6)
    while (diff > 0) {
    const x = (Math.random() * 600) >> 0
    const y = (Math.random() * 600) >> 0
    const color = '#'+((1 << 24) * Math.random()|0).toString(16)
    const food = new Food(x, y, color, ctx)
    foods.push(food)
    diff--
  }
  }, 2500)
}

let score = 0

export const getScore = () => {
  return score
}

const findFoodCollision = (foods, snake, ctx) => {
  for (const food of foods) {
    if (
      (snake.x > food.x - 10) && (snake.x < food.x + 10) &&
    	(snake.y > food.y - 10) && (snake.y < food.y + 10)
    ) {
      food.destroy(ctx)
    	foods.splice(foods.indexOf(food), 1)
      snake.length += 1
      score = snake.length - Snake.INITIAL_LENGTH
      changeScore(snake.length - Snake.INITIAL_LENGTH)
    }
  }
}
let eatSound = ''
let defeatSound = ''

const changeScore = (score) => {
  const scoreElem = document.getElementById('score')
  scoreElem.innerHTML = `Score: ${score}`
  console.log('makan')
  eatSound.play()
}

function sound(src) {
  this.sound = document.createElement("audio");
  this.sound.src = src;
  this.sound.setAttribute("preload", "auto");
  this.sound.setAttribute("controls", "none");
  this.sound.style.display = "none";
  document.body.appendChild(this.sound);
  this.play = function(){
    console.log('play music')
    // this.sound.play();
  }
  this.stop = function(){
    this.sound.pause();
  }
}

let player = ''

export const startGame = (game, ctx, username) => {
  const { snake, foods } = game
  foodGeneration(foods, ctx)
  player = username
  eatSound = new Audio(require('../assets/eatSound.mp3'))
  defeatSound = new Audio(require('../assets/defeat.mp3'))

  const canvasSize = {mapW: 600, mapH: 590}
  game.snakeInterval = setInterval(snake.running.bind(snake), 30, canvasSize, game)
  game.foodInterval = setInterval(findFoodCollision, 30, foods, snake, ctx)

  window.addEventListener('keydown', snake.directionControl.bind(snake))
}

let isFinish = false

export const getFinish = () => {
  return isFinish
}

const finishGame = (game) => {
  if(game.finished) return
  console.log('matiii')
  const { snake, snakeInterval, foodInterval } = game
  clearInterval(snakeInterval)
  clearInterval(foodInterval)
  isFinish = true
  game.finished = true
  // window.history.back()
  defeatSound.play()
}

export default Snake