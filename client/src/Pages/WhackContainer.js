import React, { useEffect, useState } from 'react';
import { IonPhaser } from '@ion-phaser/react';
import io from 'socket.io-client';
import WhackConf from './Whack-A-Mole';
import WaitingRoom from '../pages/WaitingRoom';
import swal from 'sweetalert2';
import { useHistory } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { FETCH_WHACK, POST_WHACK } from '../queries';

export default ({ location }) => {
    const history = useHistory();
    const [username, set_username] = useState('');
    const [game, setGame] = useState();
    const [initialize, setInitialize] = useState(false);
    const [waiting, set_waiting] = useState(true);
    const [win, set_win] = useState(-1);
    const [player_score, set_player_score] = useState(0);
    const [enemy_score, set_enemy_score] = useState(0);
    const [singleplayer_score, set_singleplayer_score] = useState(0);
    const [add_score] = useMutation(POST_WHACK, {
        refetchQueries: [{ query: FETCH_WHACK }]
    });

    useEffect(() => {
        const socket = io('http://localhost:3000');

        if (location.data) {
            const { username, mode } = location.data;
            if (mode === 'singleplayer') {
                if (username.length) {
                    set_username(username);
                    socket.emit('force_start');
                } else {
                    history.push({
                        pathname: '/games'
                    });
                }
            }
        }

        socket.emit('new_player');
        socket.on('req_id', (id) => {
            localStorage.setItem('id', id);
        });
        socket.on('game_start', () => {
            set_waiting(false);
            setInitialize(true);
        });
        socket.on('game_finish', () => {
            setInitialize(false);
        });
        socket.on('score_final', ({ players }) => {
            let compare_player, compare_enemy;
            for (const id in players) {
                if (id === localStorage.id) {
                    compare_player = players[id].score;
                } else {
                    compare_enemy = players[id].score;
                }
            }

            set_player_score(compare_player);
            set_enemy_score(compare_enemy);

            if (compare_player === compare_enemy) {
                set_win(0);
            } else if (compare_player > compare_enemy) {
                set_win(true);
            } else {
                set_win(false);
            }
        });
        socket.on('sp_score_final', ({ players }) => {
            if (players[localStorage.id] !== undefined) set_singleplayer_score(players[localStorage.id].score);
            else swal.fire('Jangan pergi cepat cepat', 'Ku tak cukup waktu untuk update', 'info');
        });

        const config_game = WhackConf(socket);
        setGame(Object.assign({}, config_game));
        return () => {
            socket.emit('end-session');
        };
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        async function exec() {
            if (win !== -1) {
                if (win === true) {
                    await swal.fire({
                        title: `Victory`,
                        html: `Your score: ${player_score} <br> Enemy: ${enemy_score}`
                    });
                    history.push('/games');
                } else if (win === false) {
                    await swal.fire({
                        title: `Defeat`,
                        html: `Your score: ${player_score} <br> Enemy: ${enemy_score}`
                    });
                    history.push('/games');
                } else {
                    await swal.fire({
                        title: `It's a tie!`,
                        text: `Final score: ${player_score}`
                    });
                    history.push('/games');
                }
            }
        }
        exec();
        // eslint-disable-next-line
    }, [win]);

    useEffect(() => {
        async function exec() {
            if (singleplayer_score) {
                await add_score({
                    variables: {
                        username,
                        score: +singleplayer_score
                    }
                });
                
                const result = await swal.fire({
                    title: `Congratulations, ${username}!`,
                    text: `Your final score: ${singleplayer_score}`,
                    showDenyButton: true,
                    denyButtonText: 'Home',
                    confirmButtonText: 'Leaderboard'
                });
                if (result.isConfirmed) {
                    history.push('/whack/leaderboard');
                } else if (result.isDenied || result.isDismissed) {
                    history.push('/games');
                }
            }
        }
        exec();
        // eslint-disable-next-line
    }, [singleplayer_score])

    if (waiting) {
        return (
            <>
                <WaitingRoom />
            </>
        );
    }

    return (
        <>
            <IonPhaser game={game} initialize={initialize} />
            <canvas id="game-container"></canvas>
        </>
    );
};
