const mongoose = require('mongoose');
const validator = require('validator');

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

// Before saving the pass to DB, it has to be encrypted
userSchema.pre('save', async function(next){
    const user = this;
    console.log(`Just Before`);
    next(); // It depicts that this password hashing is completed.
});

const Users = mongoose.model('Users', userSchema);

module.exports = Users;
