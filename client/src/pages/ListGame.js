import React from "react";
import snakeImg from "../assets/snake-images.svg";
import WholeaMoleImg from "../assets/whack-a-mole-images.svg";
import { Button, DropdownButton, Dropdown } from "react-bootstrap";
import swal from "sweetalert2"; // Sweetalert2 aja ya
import { useHistory } from "react-router-dom";

export default () => {
  const history = useHistory();

  const playGameSingle = async (game, diff) => {
    // console.log(game, diff)
    try {
      const result = await swal.fire({
        title: "Input Username",
        input: 'text',
      });

      if (result.isConfirmed) {
        const username = result.value;

        switch (game) {
          case 'snake':
            history.push({
              pathname: '/snake',
              data: { username, diff }
            });
            break;
        
          case 'whack':
            history.push({
              pathname: '/whack',
              data: { username, mode: 'singleplayer' }
            });
            break;

          default:
            swal.fire('Error', 'Game not found', 'error');
        }
      }
    } catch (error) {
      console.log(error);
    }

    // .then(res => {
    //   console.log(res)
    // if (res) {
    //   if (game === 'snake') {
    //     // swal('success', game)
    //     history.push({
    //       pathname: '/snake',
    //       data: { username: res, game, diff}
    //     })
    //   } else {
    //     // history.push('/whackAMoleGame')
    //   }
    // } else {
    //   swal('Invalid username', '', 'error')
    // }
    // })
  };

  const playGameMulti = () => {
    history.push({
      pathname: '/whack',
      mode: 'multiplayer'
    });
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
                {/* <Button className="ml-3 mr-3" variant="primary" onClick={_ => playGameSingle('snake')}>
                  Play Now
                </Button> */}
                <DropdownButton id="dropdown-item-button" title="Play Now" className="ml-3 mr-3">
                  <Dropdown.Item onClick={_ => playGameSingle('snake', 'easy')}>Easy</Dropdown.Item>
                  <Dropdown.Item onClick={_ => playGameSingle('snake', 'med')}>Medium</Dropdown.Item>
                  <Dropdown.Item onClick={_ => playGameSingle('snake', 'hard')}>Hard</Dropdown.Item>
                </DropdownButton>
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
                  <Dropdown.Item onClick={_ => playGameSingle('whack')}>Singleplayer</Dropdown.Item>
                  <Dropdown.Item onClick={_ => playGameMulti()}>Multiplayer</Dropdown.Item>
                </DropdownButton>
                <Button variant="warning" onClick={_ => seeLeaderboard('whack')}>
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
