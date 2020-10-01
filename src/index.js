const express = require('express');
require('./db/mongoose');   // For Connecting to DB
const Users = require('./models/users');
const Tasks = require('./models/tasks');
const { findByIdAndUpdate } = require('./models/users');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.post('/users', async (req, res) => {
    const user = new Users(req.body);
    try {
        await user.save();
        res.status(201).send(user);
    } catch (e) {
        res.status(400).send(e);
    }
});

app.get('/users', async (req, res) => {
    try {
        const users = await Users.find({});
        res.send(users);
    } catch (e) {
        res.status(500).send();
    }
});

app.get('/users/:id', async (req, res) => {
    const _id = req.params.id;
    try {
        const user = await Users.findById(_id);
        if(!user) {
            return res.status(404).send();
        }
        res.send(user);
    } catch (e) {
        res.status(500).send();
    }
});

app.patch('/users/:id', async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'email', 'password', 'age'];
    const isValidUpdate = updates.every((item) => {
        return allowedUpdates.includes(item);
    });

    if(!isValidUpdate){
        return res.status(400).send({
            error: "Invalid Updates"
        })
    }
    
    try {
        const user = await Users.findByIdAndUpdate(req.params.id, req.body, { 
            new: true, 
            runValidators: true 
        });
        if(!user){
            return res.status(404).send();
        }
        res.send(user);
    } catch (e) {
        res.status(400).send(e);
    }
});

app.post('/tasks', async (req, res) => {
    const task = new Tasks(req.body);
    try {
        await task.save();
        res.status(201).send(task);
    } catch (e) {
        res.status(400).send(err);
    }
});

app.get('/tasks', async (req, res) => {
    try {
        const tasks = await Tasks.find({});
        res.send(tasks);
    } catch (e) {
        res.status(500).send();
    }
});

app.get('/tasks/:id', async (req, res) => {
    const _id = req.params.id;
    try {
        const task = await Tasks.findById(_id);
        if(!task){
            return res.status(404).send();
        }
        res.send(task);
    } catch (e) {
        res.status(500).send();
    }
});

app.patch('/tasks/:id', async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['completed', 'description'];
    const isValidUpdate = updates.every((item) => {
        return allowedUpdates.includes(item);
    });

    if(!isValidUpdate){
        return res.status(400).send({
            error: "Invalid Updates"
        })
    }

    try {
        const id = req.params.id;
        const body = req.body;
        const task = await Tasks.findByIdAndUpdate(id, body, {
            new: true,
            runValidators: true
        });
        if(!task){
            return res.status(404).send();
        }
        res.send(task);
    } catch (e) {
        res.status(400).send(e);
    }
});

app.listen(port, () =>{
    console.log(`Server is Up on Port : ${port}`);
});