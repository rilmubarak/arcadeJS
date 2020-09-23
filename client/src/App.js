import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Home from './pages/Home'
import ListGame from './pages/ListGame'
import Leaderboard from './pages/Leaderboard'
import Whack from './pages/WhackContainer';
import Snake from './pages/Snake';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'
const client = new ApolloClient({
  uri: 'http://18.141.219.182:4003',
  cache: new InMemoryCache(),
})

function App() {
  return (
    <ApolloProvider client={client}>
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
    </ApolloProvider>
  );
}

export default App;
