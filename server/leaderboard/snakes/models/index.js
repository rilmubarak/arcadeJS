const db = require('../config/mongo');
const Snake = db.collection('snake');

module.exports = class Model {
    static read_all() {
        return Snake.find().toArray();
    }

    static post_score(score) {
        return Snake.insertOne(score);
    }
};
