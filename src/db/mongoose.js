const mongoose = require('mongoose');
const validator = require('validator');

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', { 
    useNewUrlParser: true, 
    useCreateIndex: true,
    useUnifiedTopology: true 
});

// Creating a Collection
const Users = mongoose.model('Users', {
    name: {
        type: String,
        required: true,
        trim: true
    },
    age: {
        type: Number,
        required: true,
        default: 0,
        validate(value) {
            if(value < 0){
                throw new Error (`Age must be a Positive Number`);
            }
        }
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error `Email ID is not Valid!`;
            }
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 7,
        trim: true,
        validate(value){
            if(value.toLowerCase().includes('password')){
                throw new Error (`Password should not contain Password`);
            }
        }
    }
});

// Adding Data into Collection
const me = new Users({
    name: 'Testing Password',
    age: 25,
    email: 'rahul@gmail.com',
    password: 'rahulpanchal'
});

// Saving Data into DB
me.save().then((me) => {
    console.log(me);
}).catch((err) => {
    console.log(err);
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
