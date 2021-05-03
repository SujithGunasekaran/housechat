
const GraphqlStrategy = require('./strategies');
const User = require('../../database/model/DB_userModel');

exports.initPassportMiddleware = (passport) => {

    passport.serializeUser((user, done) => {
        done(null, user._id)
    })

    passport.deserializeUser((id, done) => {
        console.log("deserialize", id);
        User.findById(id, (error, user) => {
            console.log("deserialize", user);
            done(error, user);
        })
    })

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

            user.validatePassword(userData.password, (error, result) => {
                if (error) {
                    return done(error);
                }
                if (!result) {
                    return done(null, false);
                }

                return done(null, user);
            })

        })

    }))

}
