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
        const findUsers = Users.find({});
        findUsers.then((users) => {
            res.send(users);
        }).catch((err) => {
            res.status(500).send();
        });
});

app.get('/users/:id', (req, res) => {
    const _id = req.params.id;
    const findUserById = Users.findById(_id);
    findUserById.then((user) => {
        if (!user){
            return res.status(404).send();
        }
        res.send(user);
    }).catch((err) => {
        res.status(500).send();
    })
});

app.post('/tasks', (req, res) => {
    const task = new Tasks(req.body);
    task.save().then(() => {
        res.status(201).send(task);
    }).catch((err) => {
        res.status(400).send(err);
    });
});

app.get('/tasks', (req, res) => {
    const findTasks = Tasks.find({});
    findTasks.then((tasks) => {
        res.send(tasks);
    }).catch((err) => {
        res.status(500).send();
    });
});

app.get('/tasks/:id', (req, res) => {
    const _id = req.params.id;
    const findTaskById = Tasks.findById(_id);
    findTaskById.then((task) => {
        if(!task) {
            return res.status(404).send();
        }
        res.send(task);
    }).catch((err) => {
        res.status(500).send();
    })
});

app.listen(port, () =>{
    console.log(`Server is Up on Port : ${port}`);
});