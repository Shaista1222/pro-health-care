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
        //insertOne()
        // const insetOne=await col.insertOne(
        //     { firstName: 'Wajeeha', lastName: 'ahmed', gender: 'female', dob: '1990-01-01', phoneNumber: '12301934390', address: '123 Main St' },
        // )
        //insertMany()
        // const insetMany=await col.insertMany([
        //         { firstName: 'Wajeeha', lastName: 'ahmed', gender: 'female', dob: '1990-01-01', phoneNumber: '12301934390', address: '123 Main St' },
        //         { firstName: 'zooha', lastName: 'ahmed', gender: 'female', dob: '1990-01-01', phoneNumber: '12301934390', address: '123 Main St' },
        //         { firstName: 'amreen', lastName: 'ahmed', gender: 'female', dob: '1990-01-01', phoneNumber: '12301934390', address: '123 Main St' },
        //         { firstName: 'rubab', lastName: 'ahmed', gender: 'female', dob: '1990-01-01', phoneNumber: '12301934390', address: '123 Main St' },
        //         { firstName: 'arooj', lastName: 'ahmed', gender: 'female', dob: '1990-01-01', phoneNumber: '12301934390', address: '123 Main St' },
        //         { firstName: 'farhan', lastName: 'ahmed', gender: 'female', dob: '1990-01-01', phoneNumber: '12301934390', address: '123 Main St' },
        //         { firstName: 'shumaila', lastName: 'ahmed', gender: 'female', dob: '1990-01-01', phoneNumber: '12301934390', address: '123 Main St' },
        //         { firstName: 'simi', lastName: 'ahmed', gender: 'female', dob: '1990-01-01', phoneNumber: '12301934390', address: '123 Main St' },
        //
        //     ]
        //      )
        //UpdateOne query
        // In this version, _id is converted to an ObjectId using the ObjectId constructor from the mongodb package,
        // which is necessary if your _id is stored as an ObjectId
        const updateOne = await col.updateOne(
            { _id: new ObjectId('669f8044aa58b29b60e62aa2') },
            { $set: { lastName: 'Ali',firstName:"hollefera" } }
        );
        //insertMany()
        // const updateMany = await col.updateMany(
        //     { _id: new ObjectId('669f8044aa58b29b60e62aa2') }, // Filter object
        //     {
        //         $set: {
        //             lastName: 'Ali',
        //             firstName: 'nosheen'
        //         }
        //     } ,
        //     { _id: new ObjectId('669f8044aa58b29b60e62aa3') }, // Filter object
        //     {
        //         $set: {
        //             lastName: 'Ali',
        //             firstName: 'nosheen'
        //         }
        //     } ,
        // );
        //filter object uses $in to match documents with _id in the specified array.
        const updateManys = await col.updateMany(
            { _id: { $in: [new ObjectId('669f8044aa58b29b60e62aa2'), new ObjectId('669f8044aa58b29b60e62aa3')] } }, // Filter object
            {
                $set: {
                    lastName: 'Ali',
                    firstName: 'noshera'
                },
            }
        );

        console.log(updateManys);

        console.log("Saved",updateOne)
        console.log(response);
        //use to count number of document present in a collection that match a specified query

        console.log('count',await col.countDocuments({firstName:'noshera'}))
        // Indexes make searches faster. Without indexes, MongoDB performs a collection scan, which can be slow if the collection has many documents.
        // /{ firstName: 1 } specifies that the index should be created on the firstName field, with 1 indicating ascending order. Use -1 for descending order.
        const rest=await col.createIndex( { firstNamw: 1 } )
        console.log(rest)
        // const stats=await col.stats()
        // console.log("data size",stats.size())
        //DelteteOne
        try {
            const deleteONe=await col.deleteOne({ _id: new ObjectId("669f8044aa58b29b60e62a9f") })
        }catch (e) {
            console.log(e)
        }
        //DeleteMany
        const query = {
            _id: {
                $in: [
                    new ObjectId("669f8044aa58b29b60e62aa4"),
                    new ObjectId("669f8044aa58b29b60e62aa5")
                ]
            }
        };
        try {
            const deleteMany=await col.deleteMany(query)
        }catch (e) {
            console.log(e)
        }
    } catch (err) {
        console.error('An error occurred:', err);
    } finally {
        await client.close();
        console.log("Connection closed");
    }
}

runApp();

 //it will return an error
/// const deleteMany=await col.deleteMany( [
//                 new ObjectId("669f802cd79d87fd2da51752"),
//                 new ObjectId("669f802cd79d87fd2da51753")
//             ])