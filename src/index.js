const express = require('express');
require('./db/mongoose');   // For Connecting to DB
const Users = require('./models/users');
const Tasks = require('./models/tasks');
const { find } = require('./models/users');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.post('/users', (req, res) => {
    const user = new Users(req.body);
    user.save().then(() => {
        res.status(201).send(user);
    }).catch((err) => {
        res.status(400).send(err);
    })
});

app.get('/users', (req, res) => {
        const findPromise = Users.find({});
        findPromise.then((users) => {
            res.send(users);
        }).catch((err) => {
            res.status(500).send();
        });
});

app.post('/tasks', (req, res) => {
    const task = new Tasks(req.body);
    task.save().then(() => {
        res.status(201).send(task);
    }).catch((err) => {
        res.status(400).send(err);
    });
});

app.listen(port, () =>{
    console.log(`Server is Up on Port : ${port}`);
});