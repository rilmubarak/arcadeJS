import React, { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Home from './pages/Home'
import ListGame from './pages/ListGame'
import Leaderboard from './pages/Leaderboard'
import Snake from './pages/Snake'
import WaitingRoom from './pages/WaitingRoom'
import io from 'socket.io-client';
const socket = io('http://localhost:3000');

function App() {
  const [playerID, setID] = useState('');
  const [holes, setHoles] = useState([]);
  const [timer, setTimer] = useState(-1);
  const [scores, setScores] = useState({
    player: 0,
    enemy: 0
  });

  socket.emit('new_player');
  socket.on('req_id', (id) => {
    setID(id);
  });
  socket.on('current_players', (players) => {
    console.log(players);
  });
  socket.on('game_update', (game_state) => {
    console.log(game_state); // Dijalankan selama interval "2 detik"
  });
  socket.on('score_update', (players) => {
    console.log(players) // Terpanggil setiap kali player pukul tikus
  });
  // socket.on('constant_test', ({ game_state, players, players_length }) => {
  //   console.log(game_state);
  //   console.log(players);
  //   console.log(players_length);
  // }); // TEST PURPOSE

  useEffect(() => {
    return () => {
      socket.emit('disconnect');
    };
  }, []);
  
  const game_reset = () => {
    socket.emit('game_reset');
  };

  const mole_on_hit = () => {
    socket.emit('hit', ({ id: playerID, })); // Disesuaikan dengan holes yang muncul
  }

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/games" component={ListGame} />
          <Route exact path="/snake" component={Snake} />
          <Route path="/:game/leaderBoard" component={Leaderboard} />
          <Route path="/waitingRoom" component={WaitingRoom} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
