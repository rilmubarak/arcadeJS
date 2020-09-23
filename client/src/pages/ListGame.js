import React from "react";
import snakeImg from "../assets/snake-images.svg";
import WholeaMoleImg from "../assets/whack-a-mole-images.svg";
import { Button, DropdownButton, Dropdown } from "react-bootstrap";
import swal from "sweetalert";
import { useHistory } from "react-router-dom";

export default () => {
  const history = useHistory();

  const playGameSingle = (game) => {
    swal({
      text: "Input Username",
      content: "input",
      button: {
        text: "Submit",
        closeModal: true,
      },
    })
    .then(res => {
      if (res) {
        if(game === 'snake') {
          swal('success', game)
          // history.push('/snakeGame')
        } else {
          // history.push('/whackAMoleGame')
        }
      }
    })
  };

  const playGameMulti = () => {
    history.push('/waitingRoom')
  }

  const seeLeaderboard = (game) => {
    history.push(`/${game}/leaderboard`)
  }

  return (
    <div className="listGame">
      <form className="form-inline mb-3">
        <div className="form-group mx-sm- mb-2">
          <input className="form-control ml-3" placeholder="Title Game" />
        </div>
        <button type="submit" className="btn btn-primary mb-2">
          Search
        </button>
      </form>
      <div className="col-8">
        <div className="row no-gutters">
          <div className="col-md-4">
            <img src={snakeImg} className="card-img" alt="logoGame" />
          </div>
          <div className="col-md-8">
            <div className="card-body pt-0">
              <h3>Snake</h3>
              <h6 className="card-text">
                In the game of Snake, the player uses the arrow keys to move a
                "snake" around the board. As the snake finds food, it eats the
                food, and thereby grows larger. The game ends when the snake
                either moves off the screen or moves into itself
              </h6>
              <div className="row  align-center">
                <Button className="ml-3 mr-3" variant="primary" onClick={_ => playGameSingle('snake')}>
                  Play Now
                </Button>
                <Button variant="warning" onClick={_ => seeLeaderboard('snake')}>
                  Leaderboard
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="col-8 mt-5">
        <div className="row no-gutters">
          <div className="col-md-4">
            <img src={WholeaMoleImg} className="card-img" alt="logoGame" />
          </div>
          <div className="col-md-8">
            <div className="card-body pt-0">
            <h3>Whack A Mole</h3>
              <h6 className="card-text">
                In Japan, モグラ退治 (mogura taiji, "Mole Buster") is a popular
                arcade game invented in 1975 by Kazuo Yamada of TOGO, based on
                ten of the designer's pencil sketches from 1974, licensed to
                Bandai in 1977. 
              </h6>
              <div className="row align-center">
                {/* <Button variant="primary" onClick={playGame}>
                  Play Now
                </Button> */}
                <DropdownButton id="dropdown-item-button" title="Play Now" className="ml-3 mr-3">
                  <Dropdown.Item onClick={_ => playGameSingle('WhackAMole')}>Single</Dropdown.Item>
                  <Dropdown.Item onClick={playGameMulti}>Multiplayer</Dropdown.Item>
                </DropdownButton>
                <Button variant="warning" onClick={_ => seeLeaderboard('whackaMole')}>
                  Leaderboard
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
