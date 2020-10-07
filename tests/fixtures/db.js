const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const Users = require('../../src/models/usersModel');
const Tasks = require('../../src/models/tasksModel');

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

const userTwoId = new mongoose.Types.ObjectId();
const userTwo = {
    _id: userTwoId,
    name: 'Andrew Mead',
    email: 'andrew@gmail.com',
    password: 'andrew12345',
    age: 32,
    tokens: [{
        token: jwt.sign({ _id: userTwoId }, process.env.JWT_SECRET)
    }]
}

const taskOne = {
    _id: new mongoose.Types.ObjectId(),
    description: 'Jesttttttttttt',
    completed: false,
    owner: userOneId
}

const taskTwo = {
    _id: new mongoose.Types.ObjectId(),
    description: 'Second Task',
    completed: true,
    owner: userOneId
}

const taskThree = {
    _id: new mongoose.Types.ObjectId(),
    description: 'Third Task',
    completed: true,
    owner: userTwoId
}

const setupDatabase = async () => {
    await Users.deleteMany();
    await Tasks.deleteMany();
    await new Users(userOne).save();
    await new Users(userTwo).save();
    await new Tasks(taskOne).save();
    await new Tasks(taskTwo).save();
    await new Tasks(taskThree).save();
}

module.exports = {
    userOneId,
    userOne,
    userTwoId,
    userTwo,
    taskOne,
    taskTwo,
    taskThree,
    setupDatabase
}