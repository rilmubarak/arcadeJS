import React, {ReactDOM, useEffect} from 'react'
import Phaser from 'phaser'
import {IonPhaser} from '@ion-phaser/react'
import io from 'socket.io-client';

let holes = [];

const socket = io('http://localhost:3000');
socket.emit('new_player');
socket.on('req_id', (id) => {
  localStorage.setItem('id',id)
});
socket.on('current_players', (players) => {
  console.log(players);
  const keys = Object.keys(players);
  for (let i = 0; i < keys.length; i++) {
    // if (keys[i] === playerID) {
    //   setScores({ ...scores, player: players[keys[i]].score });
    // } else {
    //   setScores({ ...scores, enemy: players[keys[i]].score });
    // }
  }
});
socket.on('game_update', (game_state) => {
  console.log(game_state); // Dijalankan selama interval "1 detik"
  // setTimer(game_state.timer);
  // setHoles(game_state.holes);
});
socket.on('score_update', (players) => {
  console.log(players) // Terpanggil setiap kali player pukul tikus
});

const config = {
    width: 800,
    height: 600,
    type: Phaser.AUTO,
    backgroundColor: '#008000',
    scene: {
      preload: preload,
      create: create,
      update: update,
      clickHandler: clickHandler
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {y:200}
        }
    },
    pixelArt: true
}

const game = new Phaser.Game(config)

function preload() {
        this.load.image({key:"background", url:require("../assets/WhackAMole/bg_1.png")})
        this.load.image("hole", require("../assets/WhackAMole/hole.png"),{})
        this.load.image("mole", require("../assets/WhackAMole/mole 2.png"),{})
        this.score = 0
}

function create() {
    this.add.image(400,300,"background")
    this.add.text(0.5,0.5,"Hello World")
    const holePos = [[100,150],[366.67,150],[633.3367,150],[100,450],[366.67,450],[633.3367,450]]

    for(let i=0; i<6;i++) {
        var hole1 = this.add.sprite(holePos[i][0],holePos[i][1],"hole")
    }
    this.info = this.add.text(700, 10, '', { font: '20px Arial' });
    this.timer = this.time.addEvent({ delay: 3000,loop: true, callback: showMole, callbackScope: this })

    this.moles = []
    const pos = [[100,120],[366.67,120],[633.3367,120],[100,420],[366.67,420],[633.3367,420]]
    // socket.on

    for(let i = 0;i<6; i++) {
      let x = pos[i][0]
      let y = pos[i][1]
      let moleSprite = this.add.sprite(x,y,"mole")
      moleSprite.setVisible(false)
      // moleSprite.on('clicked', clickHandler, this)

      this.moles.push(moleSprite)
    }
      
    // var sceneShowBall = showBall.bind(this)
    //     sceneShowBall()
}
function message () {
  console.log('seelsai')
}
function update() {
        this.info.setText('Score: ' + this.score + '\nTime: ' + Math.floor(10000 - this.timer.getElapsed()));
}
function clickHandler () {
  socket.emit('hit', ({ id: localStorage.id, holes }));
  this.mole.setVisible(false)
  this.score+=5
  // this.mole.off('clicked', clickHandler);
  this.mole.input.enabled = false;
  this.mole.setVisible(false);
}
function showMole() {
  let i = Math.ceil(Math.random()*5)
  this.moles.filter((mole,index) => {
    if(index !== i) {
      mole.setVisible(false)
    } else {
      this.mole = this.moles[i].setVisible(true)
      this.mole.setInteractive()
      this.input.on('gameobjectup', function (pointer, gameObject) {
        gameObject.emit('clicked', gameObject);
    }, this);
      this.mole.on('clicked',clickHandler.bind(this))
    }
  })
}


// ReactDOM.render(<Test />, document.getElementById("root"));

export default function abc () {
  // useEffect(() => {
  //   const setIDMemo = useMemo(() => setID(id), [id]);
  //   socket.on('game_start', /** Move player into the game */);
  // }, []);
  // useEffect(() => {
  //   return () => {
  //     socket.emit('disconnect');
  //   };
  // }, []);
    return <IonPhaser game= {game} initialize={true}>
      <p>TEEEEEEEEEST</p>
    </IonPhaser>
}