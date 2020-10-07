const request = require('supertest');
const app = require('../src/app');
const Users = require('../src/models/usersModel');

// Wipe DB before Each Test
beforeEach(async () => {
    await Users.deleteMany();
});

test('Signup a New User', async () => {
    await request(app).post('/users').send({
        name: 'Rahul Panchal',
        email: 'rahulnpanchal50@gmail.com',
        password: 'rahul123',
        age: 24
    }).expect(201);
});