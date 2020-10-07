const express = require('express');
require('./db/mongoose');   // For Connecting to DB
const UsersRouter = require('./routers/usersRouter');
const TasksRouter = require('./routers/tasksRouter');

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(UsersRouter);
app.use(TasksRouter);

app.listen(port, () =>{
    console.log(`Server is Up on Port : ${port}`);
});