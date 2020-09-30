const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

const connectionURL = 'mongodb://127.0.0.1:27017';
const databaseName = 'task-manager';

MongoClient.connect(connectionURL, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
    if(error){
        return console.log(`Unable to Connect`);
    }
    console.log(`Connected to DB`);

    const db = client.db(databaseName);

    db.collection('users').findOne({ name: 'Bhavin' }, (error, user) => {
        if(error){
            return console.log(`Unable to fetch user`);
        }
        console.log(user);
    });
});
