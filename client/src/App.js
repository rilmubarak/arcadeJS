import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
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
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <button onClick={mole_on_hit}>MOLE</button>
        <button onClick={game_reset}>RESET</button>
      </header>
    </div>
  );
}

export default App;
