const express = require('express');
const Tasks = require('../models/tasksModel');
const router = new express.Router;

router.post('/tasks', async (req, res) => {
    const task = new Tasks(req.body);
    try {
        await task.save();
        res.status(201).send(task);
    } catch (e) {
        res.status(400).send(err);
    }
});

router.get('/tasks', async (req, res) => {
    try {
        const tasks = await Tasks.find({});
        res.send(tasks);
    } catch (e) {
        res.status(500).send();
    }
});

router.get('/tasks/:id', async (req, res) => {
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

router.patch('/tasks/:id', async (req, res) => {
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

router.delete('/tasks/:id', async (req, res) =>{
    const id = req.params.id;
    try {
        const task = await Tasks.findByIdAndDelete(id);
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