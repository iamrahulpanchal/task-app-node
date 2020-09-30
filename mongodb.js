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

    const updatePromise = db.collection('users').updateOne({ 
        _id: new ObjectID("5f7435b23829371884207feb") 
    }, {
        $set: {
            name: 'Rahul Panchal Update'
        },
        $inc: {
            age: 5,
        }
    });

    updatePromise.then((resp) => {
        console.log(resp.modifiedCount);
    }).catch((err) => {
        console.log(err);
    });
});
