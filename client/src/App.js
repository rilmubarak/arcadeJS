import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Home from './pages/Home'
import ListGame from './pages/ListGame'
import Leaderboard from './pages/Leaderboard'

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/listGame" component={ListGame} />
          <Route path="/:game/leaderBoard" component={Leaderboard} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
