const request = require('supertest');
const app = require('../src/app');
const Tasks = require('../src/models/tasksModel');
const { 
    userOneId, 
    userOne, 
    setupDatabase,
    userTwoId, 
    userTwo, 
    taskOne,
    taskTwo,
    taskThree
} = require('./fixtures/db');

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

test('Fetch User Tasks', async () => {
    const response = await request(app)
        .get('/tasks')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)
    
    expect(response.body.length).toEqual(2);
})

test('Not Delete Other User Tasks', async () => {
    const response = await request(app)
        .delete(`/tasks/${taskOne._id}`)
        .set('Authorization', `Bearer ${userTwo.tokens[0].token}`)
        .send()
        .expect(404)
    
    const task = await Tasks.findById(taskOne._id);
    expect(task).not.toBeNull();
});