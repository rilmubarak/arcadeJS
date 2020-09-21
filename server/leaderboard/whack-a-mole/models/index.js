const db = require('../config/mongo');
const Mole = db.collection('whack-a-mole');

module.exports = class Model {
    static read_all() {
        return Mole.find().toArray();
    }

    static post_score(score) {
        return Mole.insertOne(score);
    }
};
