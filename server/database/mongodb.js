const mongoose = require('mongoose');
const config = require('../config/dev');

require('../database/model/DB_portfolioModel');
require('../database/model/DB_userModel');

exports.connect = () => {
    mongoose.connect(config.mongoURI,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        }, () => {
            console.log("Mongodb Connected successfully");
        })
};