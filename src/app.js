const express = require('express');
require('./db/mongoose');   // For Connecting to DB
const UsersRouter = require('./routers/usersRouter');
const TasksRouter = require('./routers/tasksRouter');

const app = express();

app.use(express.json());
app.use(UsersRouter);
app.use(TasksRouter);

module.exports = app;