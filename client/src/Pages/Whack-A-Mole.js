import Phaser from 'phaser';

const config = (socket) => {
  return {
    width: 800,
    height: 600,
    type: Phaser.CANVAS,
    backgroundColor: '#008000',
    scene: {
      preload: preload,
      create: create,
      update: update,
      extend: { data: { socket } }
    },
    physics: {
      default: 'arcade',
      arcade: {
        gravity: { y: 200 }
      }
    },
    socket: socket,
    pixelArt: true,
    canvas: document.getElementById('game-container'),
    autoCenter: Phaser.Scale.Center
  }
}
var timer = 60;
var score = 0

function preload() {
  this.load.image({ key: "background", url: require("../assets/WhackAMole/bg_1.png") })
  this.load.image("hole", require("../assets/WhackAMole/hole.png"), {})
  this.load.image("mole", require("../assets/WhackAMole/mole 2.png"), {})
  this.score = score
}

function create(a) {
  const scene = this;
  scene.socket = a;
  scene.add.image(400, 300, "background")
  scene.add.text(0.5, 0.5, "", { color: '#000000' })
  const holePos = [[100, 150], [366.67, 150], [633.3367, 150], [100, 450], [366.67, 450], [633.3367, 450]]

  for (let i = 0; i < 6; i++) {
    var hole1 = scene.add.sprite(holePos[i][0], holePos[i][1], "hole")
  }
  scene.info = scene.add.text(700, 10, '', { font: '20px Arial' });
  this.timer = this.time.addEvent({ delay: 60000, loop: true, callback: this, callbackScope: this })
  scene.moles = []
  const pos = [[100, 120], [366.67, 120], [633.3367, 120], [100, 420], [366.67, 420], [633.3367, 420]]
  this.timer = timer
  // socket.on
  // for (let i = 0; i < 6; i++) {
  //   let x = pos[i][0]
  //   let y = pos[i][1]
  //   let moleSprite = scene.add.sprite(x, y, "mole")
  //   moleSprite.setVisible(false)
  //   moleSprite.setInteractive()
  //   moleSprite.once('clicked', clickHandler,this);
  //   scene.moles.push(moleSprite)
  // }
  this.input.on('gameobjectup', function (pointer, gameObject) {
    gameObject.emit('clicked', gameObject);
  }, this);
  this.data.list.socket.on('game_update', ({ timer, holes }) =>{
    this.timer--
    scene.moles.map((mole,index) => {
      if(mole !== '' ){
        mole.destroy()
      }
    })
    scene.moles=[]
    showMole(scene,timer,holes,this)
  })

  // var sceneShowBall = showBall.bind(this)
  //     sceneShowBall()
}
function message() {
  console.log('seelsai')
}
function update() {
  // this.info.setText('Score: ' + this.score + '\nTime:'  + Math.floor(60000 - this.timer.getElapsed()));
  this.info.setText('Score: ' + this.score + '\nTime:'  + this.timer);

}
// function clickHandler(i,molesArr,holes,data) {
//   holes[i] = 0
//   data.data.list.socket.emit('hit', ({ id: localStorage.id, holes }));
//   molesArr[i].input.enabled = false;
//   console.log(`clicked at: ${i}`)
// }
function clickHandler(moleSprite,i,holes,data) {
  data.score++
  console.log('clicked')
  holes[i] = 0
  data.data.list.socket.emit('hit', ({ id: localStorage.id, holes }));
  moleSprite.off('clicked', clickHandler);
    // moleSprite.input.enabled = false;
    moleSprite.destroy()
    // moleSprite.setVisible(false);
}
function showMole(scene,timer,holes,data) {
  const pos = [[100, 120], [366.67, 120], [633.3367, 120], [100, 420], [366.67, 420], [633.3367, 420]]
  // console.log(data,',,,,,,,,,,')
  // eslint-disable-next-line
  // console.log(scene.moles,'scenemoles>>>>')
    holes.filter((hole,i) => {
      if(hole === 1) {
        let x = pos[i][0]
        let y = pos[i][1]
        let moleSprite = scene.add.sprite(x, y, "mole")
        scene.moles[i]=moleSprite
        scene.moles[i].setVisible(true)
        scene.moles[i].setInteractive()
        scene.moles[i].once('clicked', () => clickHandler(scene.moles[i],i,holes,data));
        // scene.moles.push(moleSprite)
        // molesArr[i].setVisible(true)
        // molesArr[i].once('clicked', clickHandler,this);
        // molesArr[i].setInteractive()
        // molesArr[i].once('clicked', () => clickHandler(i,molesArr,holes,data));
      } else {
        scene.moles[i] = ''
        // molesArr[i].setVisible(false)
        // molesArr[i].off('clicked', clickHandler);
      }
    })
    
 
}

export default config;