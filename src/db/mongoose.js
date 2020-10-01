const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', { 
    useNewUrlParser: true, 
    useCreateIndex: true,
    useUnifiedTopology: true 
});

// Creating a Collection
const Users = mongoose.model('Users', {
    name: {
        type: String
    },
    age: {
        type: Number
    }
});

// Adding Data into Collection
const me = new Users({
    name: 'Rahul Panchal',
    age: 24
});

// Saving Data into DB
me.save().then((me) => {
    console.log(me);
}).catch((err) => {
    console.log(`Unable to Save to DB ${err}`);
})