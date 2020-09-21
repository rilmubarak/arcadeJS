const express = require('express');
const app = express();
const PORT = process.env.PORT || 3002;
const Controller = require('./controller');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.get('/whack/leaderboard', Controller.read);
app.post('/whack/leaderboard', Controller.add);

module.exports = { app, PORT };
