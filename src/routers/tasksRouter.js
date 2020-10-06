const express = require('express');
const Tasks = require('../models/tasksModel');
const Users = require('../models/usersModel');
const router = new express.Router;
const auth = require('../middleware/auth');

router.post('/tasks', auth, async (req, res) => {
    const task = new Tasks({
        ...req.body,
        owner: req.user._id
    });
    try {
        await task.save();
        res.status(201).send(task);
    } catch (e) {
        res.status(400).send(err);
    }
});

router.get('/tasks', auth, async (req, res) => {
    const match = {};
    if(req.query.completed){
        match.completed = req.query.completed === 'true';
    }
    try {
        await req.user.populate({
            path: 'tasks',
            match: match,
            options: {
                limit: parseInt(req.query.limit)
            }
        }).execPopulate();
        res.send(req.user.tasks);
    } catch (e) {
        res.status(500).send();
    }
});

router.get('/tasks/:id', auth, async (req, res) => {
    const _id = req.params.id;
    try {
        const task = await Tasks.findOne({
            _id: _id,
            owner: req.user._id
        });
        if(!task){
            return res.status(404).send();
        }
        res.send(task);
    } catch (e) {
        res.status(500).send();
    }
});

router.patch('/tasks/:id', auth, async (req, res) => {
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
        const task = await Tasks.findOne({
            _id: id,
            owner: req.user._id
        });
        if(!task){
            return res.status(404).send();
        }
        updates.forEach((field) => {
            task[field] = body[field];
        });
        await task.save();
        res.send(task);
    } catch (e) {
        res.status(400).send(e);
    }
});

router.delete('/tasks/:id', auth, async (req, res) =>{
    const id = req.params.id;
    try {
        const task = await Tasks.findOneAndDelete({
            _id: id,
            owner: req.user._id
        });
        if(!task){
            return res.status(404).send({
                error: "Task Not Found!"
            })
        }
        res.send(task);
    } catch (e) {
        res.status(400).send(e);
    }
});

module.exports = router;