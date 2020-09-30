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

    db.collection('users').deleteOne({
        "_id" : new ObjectID("5f744496a6400e1750463c1c")
    }).then((resp) => {
        console.log(resp.deletedCount);
    }).catch((err) => {
        console.log(err);
    });
});
