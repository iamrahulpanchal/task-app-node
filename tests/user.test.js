const request = require('supertest');
const app = require('../src/app');

test('Signup a New User', async () => {
    await request(app).post('/users').send({
        name: 'Rahul Testing',
        email: 'rahul@example.com',
        password: 'rahultesting',
        age: 22
    }).expect(201);
});