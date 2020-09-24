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
// var timer = 60;
var game;
var sprite;
var score = 0
function preload() {
  this.load.image({ key: "background", url: require("../assets/WhackAMole/bg_1.png") })
  this.load.image("hole", require("../assets/WhackAMole/hole (1)_1 1.svg"))
  this.load.image("mole", require("../assets/WhackAMole/diglett 1.svg"), {})
  this.load.image("dead_mole",require("../assets/WhackAMole/diglett_down 1.svg"))
  this.load.image("hammer",require("../assets/WhackAMole/big_hammer.svg"))
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
  scene.moles = []
  const pos = [[100, 120], [366.67, 120], [633.3367, 120], [100, 420], [366.67, 420], [633.3367, 420]]
  
  this.input.on('gameobjectup', function (pointer, gameObject) {
    gameObject.emit('clicked', gameObject);
  }, this);
  this.data.list.socket.on('game_update', ({ timer, holes }) => {
    this.timer = timer
    scene.moles.map((mole,index) => {
      if(mole !== '' ){
        mole.destroy()
      }
    })
    scene.moles=[]
    showMole(scene,timer,holes,this)
  })
  sprite = this.add.sprite( 400,300,'hammer')
  this.input.setDefaultCursor('none, pointer');
  // scene.physics.enable(sprite, Phaser.Physics.ARCADE)

//   this.input.on('pointerdown', function (pointer) {

//     this.input.mouse.requestPointerLock();

// }, this);

// When locked, you will have to use the movementX and movementY properties of the pointer
// (since a locked cursor's xy position does not update)
// this.input.on('pointermove', function (pointer) {

//     if (this.input.mouse.locked)
//     {
//         sprite.x += pointer.movementX;
//         sprite.y += pointer.movementY;


//         // Force the sprite to stay on screen
//         sprite.x = Phaser.Math.Wrap(sprite.x, 0, game.renderer.width);
//         sprite.y = Phaser.Math.Wrap(sprite.y, 0, game.renderer.height);

//         if (pointer.movementX > 0) { sprite.setRotation(0.1); }
//         else if (pointer.movementX < 0) { sprite.setRotation(-0.1); }
//         else { sprite.setRotation(1.5); }

//     }
// }, this);

}
function message() {
  console.log('seelsai')
}
function update() {
  this.info.setText('Score: ' + this.score + '\nTime:'  + this.timer);
  this.input.on('pointermove', function (pointer) {
    sprite.rotation = 0
    sprite.x = pointer.x + 40
    sprite.y = pointer.y - 80

}, this);
this.input.on('pointerdown', function (pointer) {
  sprite.rotation = -1.4

}, this);
  
  // if (game.input.mousePointer.isDown)
  //   {
  //       //  400 is the speed it will move towards the mouse
  //       game.physics.arcade.moveToPointer(sprite, 400);

  //       //  if it's overlapping the mouse, don't move any more
  //       if (Phaser.Rectangle.contains(sprite.body, game.input.x, game.input.y))
  //       {
  //           sprite.body.velocity.setTo(0, 0);
  //       }
  //   }
  //   else
  //   {
  //       sprite.body.velocity.setTo(0, 0);
  //   }
}

function clickHandler(moleSprite,i,holes,data,scene) {
  moleSprite.destroy()
  const pos = [[100, 150], [366.67, 150], [633.3367, 150], [100, 450], [366.67, 450], [633.3367, 450]]
  let x = pos[i][0]
  let y = pos[i][1]
  let dead_mole;
  function createDeadMole(x,y) {
    dead_mole = scene.add.sprite(x, y, "dead_mole")
    return dead_mole
  }
  function destroyDeadMole(dead_mole) {
    dead_mole.destroy()
  }

  data.time.addEvent({ delay: 200 , callback: ()=> {dead_mole.destroy()}, callbackScope: createDeadMole(x,y)  })
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
  const pos = [[100, 190], [366.67, 190], [633.3367, 190], [100, 490], [366.67, 490], [633.3367, 490]]
  // eslint-disable-next-line
    holes.filter((hole,i) => {
      if(hole === 1) {
        let x = pos[i][0]
        let y = pos[i][1]
        let moleSprite = scene.add.sprite(x, y, "mole")
        scene.moles[i]=moleSprite
        scene.moles[i].setVisible(true)
        scene.moles[i].setInteractive()
        scene.moles[i].once('clicked', () => clickHandler(scene.moles[i],i,holes,data,scene));

        var tween = data.tweens.add({
          targets: [ moleSprite ],
          y: 4,
          duration: 10000,
          ease: 'Power2',
          yoyo: false,
          repeat: -1,
          delay: function (t, total, target) {
              return t * 1000;
          }
      });
      } else {
        scene.moles[i] = ''
      }
    })
    
 
}

export default config;