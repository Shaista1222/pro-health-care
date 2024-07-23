const { MongoClient, ObjectId} = require('mongodb');
const url = 'mongodb://127.0.0.1:27017/';
const client = new MongoClient(url);
const database = 'Hospital_Managmenet';

//client.connect will return a promise because sometimes it took time

const runApp = async()=> {
    try {
        const result = await client.connect();
        console.log("Connected successfully to server");

        const db = result.db(database);
        console.log("db:", db.databaseName);

        const col = db.collection('Patient');
        //Find()
        const response = await col.find({}).toArray();
        console.log(response)
        //will del many dcuments according to name as well
        // const delMany=await col.deleteMany({firstName:'noshera'})
        // console.log('delted',delMany)
        //based on and condition
        const basedOnAndCondition= await col.deleteMany({$and:[{firstName:'simi'},{lastName:'ahmed'}]})
        console.log(`${basedOnAndCondition.deletedCount} document(s) were deleted.`);
        //based on or conition delete many
        const orCondition=await col.deleteMany({$or:[{firstName:'simi'},{lastName:'ahmed'}]})
        console.log(`${orCondition.deletedCount} document(s) were deleted.`);
        // Delete documents where the _id matches any of the values in the array
        const result = await collection.deleteMany({
            _id: { $in: [new ObjectId("669f8044aa58b29b60e62aa4"), new ObjectId("669f8044aa58b29b60e62aa5")] }
        });
    } catch (err) {
        console.error('An error occurred:', err);
    } finally {
        await client.close();
        console.log("Connection closed");
    }
}

runApp();
//to rename the collection
//db.rrecord.renameCollection("record")
//replaceOne()
// const filter = { _id: new ObjectId("669f8044aa58b29b60e62aa4") };
// const replacement = { name: "Eve", age: 35, city: "New York" };
// // Replace the matched document with the new document, insert if no match
// const result = await collection.replaceOne(filter, replacement, { upsert: true });
