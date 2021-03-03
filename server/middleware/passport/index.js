
const GraphqlStrategy = require('./strategies');
const User = require('../../database/model/DB_userModel');

exports.initPassportMiddleware = (passport) => {

    passport.use('graphql', new GraphqlStrategy((userData, done) => {

        // 1. Find user in db if user exist verify user password
        // if user is verified call done.

        User.findOne({ email: userData.email }, (err, user) => {
            if (err) {
                return done(err);
            }
            if (!user) {
                return done(null, false); // ( error, data ) => null (error) and false (user);
            }
            return done(null, user);
        })

    }))

}