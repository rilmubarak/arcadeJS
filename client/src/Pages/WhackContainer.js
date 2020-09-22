import React, { useEffect, useState } from 'react';
import { IonPhaser } from '@ion-phaser/react';
import io from 'socket.io-client';
import Phaser from 'phaser';
import WhackConf from './Whack-A-Mole';

export default () => {
    const [game, setGame] = useState();
    const [initialize, setInitialize] = useState(false);

    useEffect(() => {
        const socket = io('http://localhost:3000');
        socket.emit('new_player');
        socket.on('req_id', (id) => {
            localStorage.setItem('id', id);
            console.log(id)
        });
        socket.on('game_start', () => {
            setInitialize(true);
        });
        // const config_game = WhackConf;
        const config_game = WhackConf(socket); // config rusak
        setGame(Object.assign({}, config_game));
    }, []);

    if (!initialize) {
        return (
            <>
                <button onClick={e => setInitialize(true)}>TEST PURPOSE</button>
                <h1>Waiting for other player</h1>
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
