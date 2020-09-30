const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const ObjectID = mongodb.ObjectID;

const connectionURL = 'mongodb://127.0.0.1:27017';
const databaseName = 'task-manager';

MongoClient.connect(connectionURL, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
    if(error){
        return console.log(`Unable to Connect`);
    }
    console.log(`Connected to DB`);

    const db = client.db(databaseName);

    const updateManyPromise = db.collection('tasks').updateMany({
        completed: false
    }, {
        $set: {
            completed: true
        }
    });

    updateManyPromise.then((resp) => {
        console.log(resp.modifiedCount);
    }).catch((err) => {
        console.log(err);
    });
});
