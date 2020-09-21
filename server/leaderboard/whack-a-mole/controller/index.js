const Mole = require('../models');

module.exports = class Controller {
    static async add(req, res) {
        try {
            const score = await Mole.post_score(req.body);
            res.status(201).json(score.ops[0]);
        } catch (error) {
            console.log(error);
            res.status(500).json({ msg: 'Error posting score' });
        }
    }

    static async read(req, res) {
        try {
            const leaderboard = await Mole.read_all();
            res.status(200).json(leaderboard);
        } catch (error) {
            console.log(error);
            res.status(500).json({ msg: 'Error getting scores' });
        }
    }
};