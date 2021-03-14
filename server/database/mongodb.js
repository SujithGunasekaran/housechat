const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const config = require('../config/dev');

require('../database/model/DB_portfolioModel');
require('../database/model/DB_userModel');
require('../database/model/DB_forumCategory');
require('../database/model/DB_topic');

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

exports.initializeMongodbSession = () => {
    const store = new MongoDBStore({
        uri: config.mongoURI,
        collection: 'portfolioSession'
    });

    return store;
}