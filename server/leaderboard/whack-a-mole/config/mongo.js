const MongoURI = process.env.MONGO_SERVER_URI || 'mongodb://localhost:27017';

const MongoClient = require('mongodb').MongoClient;
    const db_name = 'game';
    const client = new MongoClient(MongoURI, { useUnifiedTopology: true });
    
    client.connect();
    
    const db = client.db(db_name);
    
    module.exports = db;