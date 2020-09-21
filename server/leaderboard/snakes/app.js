const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;
const Controller = require('./controller');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.get('/snake/leaderboard', Controller.read);
app.post('/snake/leaderboard', Controller.add);

module.exports = { app, PORT };
