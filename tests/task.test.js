const request = require('supertest');
const app = require('../src/app');
const Tasks = require('../src/models/tasksModel');
const { userOneId, userOne, setupDatabase } = require('./fixtures/db');

beforeEach(setupDatabase)

test('Create Task for User', async () => {
    const response = await request(app)
        .post('/tasks')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            description: 'Jest is Boring'
        })
        .expect(201)

    const task = await Tasks.findById(response.body._id);
    expect(task).not.toBeNull();
    expect(task.completed).toBe(false)
});