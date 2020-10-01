const mongoose = require('mongoose');
require('../src/db/mongoose');
const Tasks = require('./models/tasks');

Tasks.findByIdAndDelete("5f75a446d009921c10432797").then(() => {
    console.log(`User Removed`);
    return Tasks.countDocuments({
        completed: false
    });
}).then((res) => {
    console.log(res);
}).catch((e) => {
    console.log(e);
})