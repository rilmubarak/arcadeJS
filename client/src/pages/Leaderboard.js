import { useQuery } from "@apollo/client";
import React, { useEffect } from "react";
import { Button } from 'react-bootstrap'
import { useHistory, useRouteMatch } from 'react-router-dom'
import Swal from "sweetalert2";
import LoadingCat from "../components/LoadingCat";
import { FETCH_SNAKE, FETCH_WHACK } from "../queries";
import rfdc from 'rfdc';

export default () => {
  const history = useHistory()
  const match = useRouteMatch();
  const { data, loading, error } = match.params.game === 'snake' ? useQuery(FETCH_SNAKE) : useQuery(FETCH_WHACK);
  const clone = rfdc();

  useEffect(() => {
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (data) {
    }
  }, [data]);

  if (loading) return <LoadingCat />;
  if (error) {
    Swal.fire('Connection to server failed', 'Report this issue to the developer team!', 'error');
    history.push({ pathname: '/games' });
  }

  const backtoGame = () => {
    history.push('/games')
  }

  const tmp = match.params.game === 'snake' ? data.get_snake_leaderboard : data.get_whack_leaderboard;
  const scores = clone(tmp);
  scores.sort(function (a, b) {
    return b.score - a.score;
  });

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
              {
                scores.map((score) => {
                  return (
                    <tr key={score._id}>
                      <td>
                        {score.username}
                      </td>
                      <td>
                        {score.score}
                      </td>
                    </tr>
                  );
                })
              }
            </tbody>
          </table>
        </div>
        <Button variant='primary' onClick={backtoGame}>Go Back</Button>
      </div>
    </div>
  );
};
