const MongoURI = process.env.MONGO_SERVER_URI || 'mongodb://localhost:27017';

if (process.env.MONGO_SERVER_URI) {
    const mongoose = require('mongoose');
    mongoose.Promise = global.Promise;
    const db = mongoose.createConnection(MongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

    module.exports = db;
} else {
    const MongoClient = require('mongodb').MongoClient;
    const db_name = 'game';
    const client = new MongoClient(MongoURI, { useUnifiedTopology: true });
    
    client.connect();
    
    const db = client.db(db_name);
    
    module.exports = db;
}
