import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import {Button, Row, Col} from 'react-bootstrap'

function App() {
  const [arr,setArr] = useState([0,0,0,0,0,0])
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <body>
        <Row>
          {arr.map((val,index) => {
              return(
                <Col xs="4">
                  <Button>Mole-{index+1}</Button>
                </Col>
              )
          })}
        </Row>
        
      </body>
    </div>
  );
}

export default App;
