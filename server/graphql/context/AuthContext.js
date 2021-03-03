const passport = require('passport');

const authenticateUserData = (userData) => {
    console.log("calling authenticateUserData");

    const done = () => {
        // Here we will get user if user is authenticate
        // if we get user we can save session to DB.

        console.log("calling done of authenticate");
    }

    const authenticateUserData = passport.authenticate('graphql', userData, done())
    authenticateUserData();

    return true;
}


exports.buildAuthContext = () => {

    const auth = {
        authenticate: (userData) => {
            return authenticateUserData(userData);
        }
    }
    return auth;
}