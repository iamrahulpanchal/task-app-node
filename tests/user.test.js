const request = require('supertest');
const app = require('../src/app');
const Users = require('../src/models/usersModel');
const { userOneId, userOne, setupDatabase } = require('./fixtures/db');

beforeEach(setupDatabase)

test('Signup a New User', async () => {
    const response = await request(app).post('/users').send({
        name: 'Rahul Panchal',
        email: 'rahulnpanchal@gmail.com',
        password: 'rahul123',
        age: 24
    }).expect(201);

    const user = await Users.findById(response.body.user._id);
    expect(user).not.toBeNull();

    expect(response.body).toMatchObject({
        user: {
            name: 'Rahul Panchal',
            email: 'rahulnpanchal@gmail.com'
        },
        token: user.tokens[0].token
    })

    expect(user.password).not.toBe('rahul123')
});

test('Login Existing User', async () => {
    const response = await request(app).post('/users/login').send({
        email: userOne.email,
        password: userOne.password
    }).expect(200);
    const user = await Users.findById(userOneId);
    expect(response.body.token).toBe(user.tokens[1].token);
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
    
    const user = await Users.findById(userOneId);
    expect(user).toBeNull();
});

test('Dont Delete User Profile Unauthenticated', async () => {
    await request(app)
        .delete('/users/me')
        .send()
        .expect(401)
});

test('Upload Avatar Image', async () => {
    await request(app)
        .post('/users/me/avatar')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .attach('avatar', 'tests/fixtures/profile-pic.jpg')
        .expect(200)
    
    const user = await Users.findById(userOneId);
    expect(user.avatar).toEqual(expect.any(Buffer))
});

test('Update Valid User Fields', async () => {
    await request(app)
        .patch('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            name: 'Bhumi Panchal'
        })
        .expect(200)
        
    const user = await Users.findById(userOneId);
    expect(user.name).toEqual('Bhumi Panchal');
});

test('Not Update Invalid User Fields', async () => {
    await request(app)
        .patch('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            location: 'Bhayandar'
        })
        .expect(400)
});