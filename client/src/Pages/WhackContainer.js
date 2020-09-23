import React, { useEffect, useState } from 'react';
import { IonPhaser } from '@ion-phaser/react';
import io from 'socket.io-client';
import WhackConf from './Whack-A-Mole';
import WaitingRoom from './WaitingRoom';
import swal from 'sweetalert';

function get_object_length(obj) {
    let length = 0;
    const keys = Object.keys(obj);
    keys.forEach(() => {
        length++;
    });
    return length;
};

export default () => {
    const [game, setGame] = useState();
    const [initialize, setInitialize] = useState(false);
    const [waiting, set_waiting] = useState(true);

    useEffect(() => {
        const socket = io('http://localhost:3000');
        socket.emit('new_player');
        socket.on('req_id', (id) => {
            localStorage.setItem('id', id);
            console.log(id)
        });
        socket.on('game_start', () => {
            set_waiting(false);
            setInitialize(true);
        });
        socket.on('game_finish', () => {
            setInitialize(false);
        });
        socket.on('score_final', ({ players }) => {
            let player_score, enemy_score;
            for (const id in players) {
                if (id === localStorage.id) {
                    player_score = players[id].score;
                } else {
                    enemy_score = players[id].score;
                }
            }

            if (player_score === enemy_score) {
                swal({
                    title: `It's a tie!`,
                    text: `Final score: ${player_score}`
                });
            } else if (player_score > enemy_score) {
                swal({
                    title: `Victory`,
                    text: `Your score: ${player_score} \r\n Enemy: ${enemy_score}`
                });
            } else {
                swal({
                    title: `Defeat`,
                    text: `Your score: ${player_score} \r\n Enemy: ${enemy_score}`
                });
            }
        });
        socket.on('sp_score_final', ({ players }) => {
            //players[localStorage.id].score // kirim ke leaderboard
        });

        const config_game = WhackConf(socket);
        setGame(Object.assign({}, config_game));

        return () => {
            socket.emit('disconnect');
        };
    }, []);

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
