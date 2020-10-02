const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

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
    }
});

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

const Users = mongoose.model('Users', userSchema);

module.exports = Users;
