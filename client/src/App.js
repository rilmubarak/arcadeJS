import React, { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Home from './pages/Home'
import ListGame from './pages/ListGame'
import Leaderboard from './pages/Leaderboard'
import Test from './pages/Whack-A-Mole'
import Snake from './pages/Snake'
import WaitingRoom from './pages/WaitingRoom'

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/games" component={ListGame} />
          <Route exact path="/snake" component={Snake} />
          <Route path="/:game/leaderBoard" component={Leaderboard} />
          <Route path="/test" component={Test} />
          <Route path="/waitingRoom" component={WaitingRoom} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
