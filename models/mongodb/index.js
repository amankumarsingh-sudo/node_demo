
// Connection URL
const url = process.env.MG_URI;
const dbName = process.env.MG_DB;

const MongoClient = require('mongodb').MongoClient;
// myAwesomeDbModule.js
let connection = null;

module.exports.connect = () => new Promise(async (resolve, reject) => {
    let db, client;
    client = await MongoClient.connect(url + dbName, { useNewUrlParser: true });
    connection = client.db(dbName);
    resolve(connection)
});

module.exports.get = () => {
    if (!connection) {
        throw new Error('Call connect first!');
    }
    return connection;
}