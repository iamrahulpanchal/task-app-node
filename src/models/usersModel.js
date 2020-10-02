const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Tasks = require('./tasksModel');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    age: {
        type: Number,
        required: true,
        default: 0,
        validate(value) {
            if(value < 0){
                throw new Error (`Age must be a Positive Number`);
            }
        }
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error `Email ID is not Valid!`;
            }
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 7,
        trim: true,
        validate(value){
            if(value.toLowerCase().includes('password')){
                throw new Error (`Password should not contain Password`);
            }
        }
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
});

userSchema.virtual('tasks', {
    ref: 'Tasks',
    localField: '_id',
    foreignField: 'owner'
});

// Instance Methods
userSchema.methods.toJSON = function() {
    const user = this;
    const userObject = user.toObject();
    delete userObject.password;
    delete userObject.tokens;
    return userObject;
};

userSchema.methods.generateAuthToken = async function() {
    const user = this;
    const token = jwt.sign({
        _id: user._id.toString()
    }, 'GeneratingToken');
    user.tokens = user.tokens.concat({
        token: token
    });
    await user.save();
    return token;
};

// Model Methods
userSchema.statics.findByCredentials = async (email, pass) => {
    const user = await Users.findOne({
        email: email
    });
    if(!user){
        throw new Error (`User Not Registered`);
    }
    const isMatch = await bcrypt.compare(pass, user.password);
    if(!isMatch){
        throw new Error (`Password is Incorrect`);
    }
    return user;
};

userSchema.pre('save', async function(next){
    const user = this;
    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password, 8);
    }
    next();
});

// Delete user tasks when user is removed.
userSchema.pre('remove', async function(next){
    const user = this;
    await Tasks.deleteMany({
        owner: user._id
    });
    next();
});

const Users = mongoose.model('Users', userSchema);

module.exports = Users;
