const config = require('../config/dev');
const session = require('express-session');
const passport = require('passport');

exports.initMiddleware = (server, mongodb) => {

    require('./passport').initPassportMiddleware(passport);

    const sessionInfo = {
        name: 'Portfolio-Session',
        secret: config.SESSION_SECRET,
        cookie: { maxAge: 2 * 60 * 60 * 1000 },
        resave: false,
        saveUninitialized: false,
        store: mongodb.initializeMongodbSession()
    }

    server.use(session(sessionInfo));

    server.use((req, res, next) => {
        req.helloWorld = () => {
            console.log("hello world");
        }
        next();
    })

}