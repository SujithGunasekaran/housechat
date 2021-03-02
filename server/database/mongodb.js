const mongoose = require('mongoose');
const config = require('../config/dev');

exports.connect = () => {
    mongoose.connect(config.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }, () => {
        console.log("Mongodb Connected successfully");
    })
};