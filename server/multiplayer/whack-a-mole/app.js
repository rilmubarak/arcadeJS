const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

let game_state = {
    timer: 60, // 60 seconds
    holes: [0, 0, 0, 0, 0, 0]
};
let players = {};
let game_start = false;

function get_object_length(obj) {
    let length = 0;
    const keys = Object.keys(obj);
    keys.forEach(() => {
        length++;
    });
    return length;
};

function reset_game_state(val) {
    return {
        timer: val,
        holes: [0, 0, 0, 0, 0, 0]
    };
};

io.on('connection', (socket) => {
    socket.on('new_player', () => {
        players[socket.id] = {
            score: 0
        };
        io.emit('current_players', players);
    });

    const players_length = get_object_length(players);
    if (players_length >= 1) {
        game_start = true;
    }

    socket.on('force_start', () => {
        game_state = reset_game_state(60);
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
                io.emit('sp_score_final', { players });
                io.emit('game_finish');
                game_state = reset_game_state(60);
            }
            io.emit('game_update', game_state);
        }, 1000);
    });

    socket.emit('req_id', socket.id);

    socket.on('hit', ({ id, holes }) => {
        if (players[id]) {
            players[id].score = players[id].score + 1;
            game_state.holes = holes;
            io.emit('game_update', game_state);
            io.emit('score_update', players); // <<< Realtime Update
        }
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
                io.emit('score_final', { players });
                io.emit('game_finish');
                game_state = reset_game_state(60);
                players = {};
            }
            io.emit('game_update', game_state);
        }, 1000);
    }

    socket.on('game_reset', () => {
        game_state = reset_game_state(0);
    });
    if (get_object_length(players) === 0) {
        game_state = reset_game_state(60);
    }
    socket.on('end-session', () => {
        delete players[socket.id];
        game_start = false;
        if (get_object_length(players) === 0) {
            game_state = reset_game_state(0);
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
}, 1000); // Watch State
