const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

let game_state = {
    timer: 100, // 60 seconds
    holes: [0, 0, 0, 0, 0, 0]
};
const players = {};
let game_start = false;

function get_object_length(obj) {
    let length = 0;
    const keys = Object.keys(obj);
    keys.forEach(() => {
        length++;
    });
    return length;
};

function reset_game_state() {
    return {
        timer: 100,
        holes: [0, 0, 0, 0, 0, 0]
    };
};

io.on('connection', (socket) => {
    socket.on('new_player', () => {
        players[socket.id] = {
            score: 0
        };
        const players_length = get_object_length(players);
        if (players_length >= 1) { // Game dalam keadaan ready saat player masih hanya 1
            game_start = true; // Game (dalam keadaan true) akan benar-benar mulai jika player sudah lebih dari 1
        }
        io.emit('current_players', players);
    });

    socket.emit('req_id', socket.id);

    socket.on('hit', ({ id, holes }) => {
        players[id].score = players[id].score + 1;
        game_state.holes = holes;
        io.emit('game_update', game_state);
        io.emit('score_update', players);
    });
    if (game_start) {
        io.emit('game_start');
        const game_update = setInterval(() => {
            game_state.timer = game_state.timer - 1;
            const new_holes = [];
            for (let i = 0; i < 6; i++) {
                let chance = Math.floor(Math.random() * 6);
                chance ? new_holes.push(0) : new_holes.push(1);
            };
            game_state.holes = new_holes;

            if (!game_state.timer || game_state.timer < 0) {
                clearInterval(game_update);
                // game_state = reset_game_state();
            }
            io.emit('game_update', game_state);
        }, 1000);
    }

    socket.on('game_reset', () => {
        game_state = reset_game_state();
    });

    socket.on('disconnect', () => {
        delete players[socket.id];
        game_start = false;
        if (get_object_length(players) === 0) {
            game_state = reset_game_state();
        }
    });
});

server.listen(3000, () => {
    console.log('Running on http://localhost:3000');
});

setInterval(() => {
    console.log('game >>> ');
    console.log(game_state, '\r\n');
    console.log('game start? >>> ');
    console.log(game_start, '\r\n');
    console.log('players >>> ');
    console.log(players);
}, 500); // Watch State
