const express = require('express');
const Users = require('../models/usersModel');
const auth = require('../middleware/auth');
const router = new express.Router;

router.post('/users', async (req, res) => {
    const user = new Users(req.body);
    try {
        await user.save();
        const token = await user.generateAuthToken();
        res.status(201).send({
            user: user,
            token: token
        });
    } catch (e) {
        res.status(400).send(e);
    }
});

router.post('/users/login', async (req, res) =>{
    try {
        const email = req.body.email; 
        const pass = req.body.password;
        const user = await Users.findByCredentials(email, pass);
        const token = await user.generateAuthToken();
        res.send({
            user: user,
            token: token 
        });
    } catch (e) {
        res.status(400).send();
    }
});

router.post('/users/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((item) => {
            return item.token !== req.token;
        });
        await req.user.save();
        res.send();
    } catch (e) {
        res.status(500).send();
    }
});

// Logout From All Devices
router.post('/users/logoutAll', auth, async (req, res) => {
    try {
        req.user.tokens = [];
        await req.user.save();
        res.status(200).send({
            success: "Logged Out of All Devices"
        });
    } catch (e) {
        res.status(500).send();
    }
});

router.get('/users/me', auth, async (req, res) => {
    const me = req.user;
    res.send(me);
});

router.patch('/users/:id', async (req, res) => {
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
        const user = await Users.findById(req.params.id);
        updates.forEach((field) => {
            user[field] = req.body[field];
        });
        await user.save();
        if(!user){
            return res.status(404).send();
        }
        res.send(user);
    } catch (e) {
        res.status(400).send(e);
    }
});

router.delete('/users/me', auth, async (req, res) =>{
    try {
        // const user = await Users.findByIdAndDelete(req.user._id);
        // if(!user){
        //     return res.status(404).send({
        //         error: "User Not Found!"
        //     })
        // }
        await req.user.remove();
        res.send(req.user);
    } catch (e) {
        res.status(400).send(e);
    }
});

module.exports = router;