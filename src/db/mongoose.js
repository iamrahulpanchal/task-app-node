const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', { 
    useNewUrlParser: true, 
    useCreateIndex: true,
    useUnifiedTopology: true 
});

// Creating a Collection
const Users = mongoose.model('Users', {
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true,
        validate(value) {
            if(value < 0){
                throw new Error (`Age must be a Positive Number`);
            }
        }
    }
});

// Adding Data into Collection
const me = new Users({
    name: 'Bhavin Panchal',
    age: -1
});

// Saving Data into DB
me.save().then((me) => {
    console.log(me);
}).catch((err) => {
    console.log(`Unable to Save to DB ${err}`);
});

// const Tasks = mongoose.model('Tasks', {
//     description: {
//         type: String
//     },
//     completed: {
//         type: Boolean
//     }
// });

// const task = new Tasks({
//     description: 'Simple Description',
//     completed: false
// });

// task.save().then((task) => {
//     console.log(task);
// }).catch((err) => {
//     console.log(err);
// });
