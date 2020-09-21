import React from "react";
import brand from "../assets/brand.svg";
import { Button } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'

export default () => {
    const history = useHistory()

    const goListGame = () => {
        history.push('/listGame')
    }

  return (
    <div className="Home">
      <img src={brand} className="App-logo" alt="logo" />
      <div className="description">
        <p>
          ArcadeJS is an online arcade made with JavaScript focusing on more
          modern UI, fast, and responsive interactivity, and is open source. Our
          goal is to relive the golden age of arcade video games with a more
          modern look and fully available for anyone to access and enjoy.
        </p>
      </div>
      <Button variant="primary" size="lg" className="mt-3" onClick={goListGame}>Show Game</Button>
    </div>
  );
};
