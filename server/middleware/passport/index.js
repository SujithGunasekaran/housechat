
const GraphqlStrategy = require('./strategies');

exports.initPassportMiddleware = (passport) => {

    passport.use('graphql', new GraphqlStrategy((userData, done) => {

        console.log("Calling verrify function strategy");

        // 1. Find user in db id user exist verify user password
        // if user is verified call done.

        if (true) {

            // first parameter : "error", second for "user"

            done();
        }

    }))

}