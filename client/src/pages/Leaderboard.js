import React from "react";
import { Button } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'

export default () => {
    const history = useHistory()

    const backtoGame = () => {
        history.push('/listGame')
    }
  return (
    <div className="container">
      <div className="col-6 leaderboard">
        <div className='box'>
          <h2>LEADERBOARD</h2>
          <table className="table mt-2">
            <thead>
              <tr>
                <th scope="col-3">Username</th>
                <th scope="col-3">Point</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Otto</td>
                <td>100</td>
              </tr>
              <tr>
                <td>Goku</td>
                <td>97</td>
              </tr>
            </tbody>
          </table>
        </div>
            <Button variant="danger" onClick={backtoGame}>Cancel</Button>
      </div>
    </div>
  );
};
