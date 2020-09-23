import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Home from './pages/Home'
import ListGame from './pages/ListGame'
import Leaderboard from './pages/Leaderboard'
import Whack from './Pages/WhackContainer';
import Snake from './Pages/Snake';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/games" component={ListGame} />
          <Route exact path="/snake" component={Snake} />
          <Route exact path="/whack" component={Whack} />
          <Route path="/:game/leaderBoard" component={Leaderboard} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
