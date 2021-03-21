const config = require('../config');
const session = require('express-session');
const passport = require('passport');

exports.initMiddleware = (server, mongodb) => {

    require('./passport').initPassportMiddleware(passport);

    // Creating the sessiong Info object

    const sessionInfo = {
        name: 'Portfolio-Session',
        secret: config.SESSION_SECRET,
        cookie: { maxAge: 2 * 60 * 60 * 1000 },
        resave: false,
        saveUninitialized: false,
        store: mongodb.initializeMongodbSession() // check out in database > mongodb.js
    }

    if (process.env.NODE_ENV === 'production') {
        server.use('trust proxy', 1);
        sessionInfo.cookie.secure = true;
        sessionInfo.cookie.httpOnly = true;
        sessionInfo.cookie.sameSite = true;
        sessionInfo.cookie.domain = process.env.DOMAIN; // yourDomainName.com
    }

    server.use(session(sessionInfo));

    server.use(passport.initialize());
    server.use(passport.session());
}