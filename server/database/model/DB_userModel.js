const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
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

// Pre will execute before saving the user data to db

UserSchema.pre('save', function (next) {
    const user = this;
    bcrypt.genSalt(10, function (err, salt) {
        if (err) { return next(err) };
        bcrypt.hash(user.password, salt, function (err, hash) {
            if (err) { return next(err) };
            user.password = hash;
            next();
        })
    })
})

UserSchema.methods.validatePassword = function (userPassword, done) {
    const user = this;
    bcrypt.compare(userPassword, user.password, function (err, result) {
        if (err) { return done(err); }
        return done(null, result);
    })
}

module.exports = mongoose.model('User', UserSchema);

