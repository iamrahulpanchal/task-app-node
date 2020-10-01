const express = require('express');
require('./db/mongoose');   // For Connecting to DB
const Users = require('./models/users');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.post('/users', (req, res) => {
    const user = new Users(req.body);
    user.save().then(() => {
        res.send(user);
    }).catch((err) => {
        res.status(400).send(err);
        // res.send(err);
    })
});

app.listen(port, () =>{
    console.log(`Server is Up on Port : ${port}`);
});