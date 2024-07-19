const { MongoClient } = require('mongodb');
const url = 'mongodb://127.0.0.1:27017/';
const client = new MongoClient(url);
const database = 'Hospital_Managmenet';

//client.connect will return a promise because sometimes it took time

 const runApp  =async()=> {
    try {
        const result = await client.connect();
        console.log("Connected successfully to server");

        const db = result.db(database);
        console.log("db:", db.databaseName);

        const col = db.collection('Patient');
        const response = await col.find({}).toArray();
        console.log(response);
    } catch (err) {
        console.error('An error occurred:', err);
    } finally {
        await client.close();
        console.log("Connection closed");
    }
}

runApp();
