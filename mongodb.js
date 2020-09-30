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

    // db.collection('users').insertMany([
    //     {
    //         name: 'Rahul',
    //         age: 24
    //     }, {
    //         name: 'Bhavin',
    //         age: 18
    //     }, {
    //         name: 'Mike',
    //         age: 32
    //     }
    // ], (error, result) => {
    //     if(error) {
    //         return console.log(`Unable to Insert`);
    //     }
    //     console.log(result.ops);
    //     console.log(result.insertedCount);
    // });

    db.collection('tasks').insertMany([{
        description: 'Task 1',
        completed: true
    }, {
        description: 'Task 2',
        completed: false
    }, {
        description: 'Task 3',
        completed: false
    }], (error, result) => {
        if(error) {
            return console.log(`Unable to Insert`);
        }
        console.log(result.ops);
        console.log(result.insertedCount);
    });

});
