const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

const game_state = {
    timer: 60, // 60 seconds
    holes: [0, 0, 0, 0, 0, 0]
};
const players = {};
let counter = 0;

io.on('connection', (socket) => {
    socket.on('new_player', () => {
        counter++;
        players[socket.id] = {
            score: 0
        };
    });

    if (counter === 2) {
        io.emit('game_start', game_state);
        socket.on('hit', (id) => {
            players[id].score++;
            io.emit('update_score', players);
        });
        setInterval(() => {
            game_state.timer = game_state.timer--;
            const new_holes = [];
            for (let i = 0; i < 6; i++) {
                let chance = Math.floor(Math.random() * 6);
                chance ? new_holes.push(0) : new_holes.push(1);
            };
            game_state.holes = new_holes;
            io.emit('update_game', game_state);
        }, 2000);
    }

    io.emit('current_players', players);

    socket.on('reset_game', () => {

    });

    setInterval(() => {
        io.emit('constant_test', { game_state, players, counter });
    }, 2000); // Test Purpose

    socket.on('disconnect', () => {
        counter--;
        delete players[socket.id];
        io.emit('disonnect', { players, counter });
    });
});

server.listen(3000, () => {
    console.log('Running on http://localhost:3000');
});
