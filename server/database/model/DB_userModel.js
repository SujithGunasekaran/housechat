const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    avatar: String,
    email: {
        type: String,
        required: 'Email is required!',
        lowercase: true,
        index: true,
        unique: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/]
    },
    name: {
        type: String
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        minlength: [8, 'Minimum password length is 6 characters!']
    },
    role: {
        enum: ['guest', 'admin', 'instructor'], // Checks if given data is available in this array
        type: String,
        required: true,
        default: 'guest'
    },
    info: String,
    createdAt: { type: Date, default: Date.now }
})

module.exports = mongoose.model('User', UserSchema);
