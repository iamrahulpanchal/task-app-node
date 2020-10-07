const request = require('supertest');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const app = require('../src/app');
const Users = require('../src/models/usersModel');

const userOneId = new mongoose.Types.ObjectId();
// For Testing LOGIN Route, We need one record
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

// Wipe DB before Each Test
beforeEach(async () => {
    await Users.deleteMany();
    await new Users(userOne).save(); // For Testing LOGIN, we add one user after wiping the DB.
});

test('Signup a New User', async () => {
    const response = await request(app).post('/users').send({
        name: 'Rahul Panchal',
        email: 'rahulnpanchal@gmail.com',
        password: 'rahul123',
        age: 24
    }).expect(201);

    const user = await Users.findById(response.body.user._id);
    expect(user).not.toBeNull();
});

test('Login Existing User', async () => {
    await request(app).post('/users/login').send({
        email: userOne.email,
        password: userOne.password
    }).expect(200);
})

test('Not Login Non Existing User', async () => {
    await request(app).post('/users/login').send({
        email: userOne.email,
        password: 'dasarsdgsd'
    }).expect(400);
})

test('Fetching User Profile', async () => {
    await request(app)
        .get('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)
});

test('Not Get Profile for Unauthenticated User', async () => {
    await request(app)
        .get('/users/me')
        .send()
        .expect(401)
});

test('Delete User Profile', async () => {
    await request(app)
        .delete('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)
});

test('Dont Delete User Profile Unauthenticated', async () => {
    await request(app)
        .delete('/users/me')
        .send()
        .expect(401)
});