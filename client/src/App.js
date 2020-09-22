import React, { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Home from './pages/Home'
import ListGame from './pages/ListGame'
import Leaderboard from './pages/Leaderboard'
import Test from './pages/Whack-A-Mole'

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/listGame" component={ListGame} />
          <Route path="/:game/leaderBoard" component={Leaderboard} />
          <Route path="/test" component={Test} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
