const request = require('supertest');
const app = require('../src/app');
const Users = require('../src/models/usersModel');

// For Testing LOGIN Route, We need one record
const userOne = {
    name: 'Bhavin Panchal',
    email: 'bhavin@gmail.com',
    password: 'bhavin12345',
    age: 18
}

// Wipe DB before Each Test
beforeEach(async () => {
    await Users.deleteMany();
    await new Users(userOne).save(); // For Testing LOGIN, we add one user after wiping the DB.
});

test('Signup a New User', async () => {
    await request(app).post('/users').send({
        name: 'Rahul Panchal',
        email: 'rahulnpanchal@gmail.com',
        password: 'rahul123',
        age: 24
    }).expect(201);
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