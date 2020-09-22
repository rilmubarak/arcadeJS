import React, { useEffect, useState } from 'react';
import Phaser from 'phaser';
import io from 'socket.io-client';
import WhackConf from './Whack-A-Mole';

export default () => {
    const [game, setGame] = useState();

    useEffect(() => {
        const game = new Phaser.Game(WhackConf);
        setGame(game);
    }, []);

    return (
        <>
            <div id="game-container"></div>
        </>
    );
};
