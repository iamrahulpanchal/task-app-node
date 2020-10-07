const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const Users = require('../../src/models/usersModel');

const userOneId = new mongoose.Types.ObjectId();
const userOne = {
    _id: userOneId,
    name: 'Bhavin Panchal',
    email: 'bhavin@gmail.com',
    password: 'bhavin12345',
    age: 18,
    tokens: [{
        token: jwt.sign({ _id: userOneId }, process.env.JWT_SECRET)
    }]
}

const setupDatabase = async () => {
    await Users.deleteMany();
    await new Users(userOne).save();
}

module.exports = {
    userOneId,
    userOne,
    setupDatabase
}