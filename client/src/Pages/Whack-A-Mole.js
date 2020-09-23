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

function preload() {
  this.load.image({ key: "background", url: require("../assets/WhackAMole/bg_1.png") })
  this.load.image("hole", require("../assets/WhackAMole/hole.png"), {})
  this.load.image("mole", require("../assets/WhackAMole/mole 2.png"), {})
  this.score = 0
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
  // scene.timer = scene.time.addEvent({ delay: 3000, loop: true, callback: showMole, callbackScope: this })
  scene.moles = []
  const pos = [[100, 120], [366.67, 120], [633.3367, 120], [100, 420], [366.67, 420], [633.3367, 420]]
  // socket.on
  for (let i = 0; i < 6; i++) {
    let x = pos[i][0]
    let y = pos[i][1]
    let moleSprite = scene.add.sprite(x, y, "mole")
    moleSprite.setVisible(false)
    this.input.on('gameobjectup', function (pointer, gameObject) {
      gameObject.emit('clicked', gameObject);
    }, this);
    // moleSprite.once('clicked', clickHandler.bind(this));

    scene.moles.push(moleSprite)
  }
  this.data.list.socket.on('game_update', ({ timer, holes }) =>{
    showMole(scene.moles,timer,holes,this)
  });

  // var sceneShowBall = showBall.bind(this)
  //     sceneShowBall()
}
function message() {
  console.log('seelsai')
}
function update() {
  this.info.setText('Score: ' + this.score + '\nTime:  + Math.floor(10000 - this.timer.getElapsed())');
}
function clickHandler(i,molesArr,holes,data) {
  holes[i] = 0
  data.data.list.socket.emit('hit', ({ id: localStorage.id, holes }));
  console.log('click')
  // this.mole.setVisible(false)
  // this.score += 5
  // this.mole.off('clicked', clickHandler);
  // this.mole.input.enabled = false;
  // this.mole.setVisible(false);
}
function showMole(molesArr,timer,holes,data) {
  // console.log(data,',,,,,,,,,,')
  // eslint-disable-next-line
    holes.filter((hole,i) => {
      if(hole === 1) {
        molesArr[i].setVisible(true)
        molesArr[i].setInteractive()
        molesArr[i].once('clicked', () => clickHandler(i,molesArr,holes,data));
      } else {
        molesArr[i].setVisible(false)
      }
    })
    
 
}

export default config;