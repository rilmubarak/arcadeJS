const Snake = require('../models');

module.exports = class Controller {
    static async add(req, res) {
            const score = await Snake.post_score(req.body);
            res.status(201).json(score.ops[0]);
    }

    static async read(req, res) {
            const leaderboard = await Snake.read_all();
            res.status(200).json(leaderboard);
    }
};