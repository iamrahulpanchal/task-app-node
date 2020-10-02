const express = require('express');
require('./db/mongoose');   // For Connecting to DB
const UsersRouter = require('./routers/usersRouter');
const TasksRouter = require('./routers/tasksRouter');

const app = express();
const port = process.env.PORT || 3000;

// app.use((req, res, next) => {
//     if(req.method === 'GET'){
//         res.send('Get Requests Disabled');
//     } else {
//         next();
//     }
// });

app.use((req, res, next) =>{
    res.status(503).send(`Site is Currently Down`);
});

app.use(express.json());
app.use(UsersRouter);
app.use(TasksRouter);

app.listen(port, () =>{
    console.log(`Server is Up on Port : ${port}`);
});