const config = require('../config/dev');
const session = require('express-session');

exports.initMiddleware = (server, mongodb) => {

    const sessionInfo = {
        name: 'Portfolio-Session',
        secret: config.SESSION_SECRET,
        cookie: { maxAge: 2 * 60 * 60 * 1000 },
        resave: false,
        saveUninitialized: false,
        store: mongodb.initializeMongodbSession()
    }

    server.use(session(sessionInfo));

}