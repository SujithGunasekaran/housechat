const passport = require('passport');

const authenticateUserData = (userData) => {

    return new Promise((resolve, reject) => {
        console.log("calling authenticateUserData");

        const done = (err, user) => {
            if (err) {
                return reject(new Error(err))
            }
            if (user) {
                return resolve(user);
            }
        }

        const authenticateUserData = passport.authenticate('graphql', userData, done)
        authenticateUserData();
    })

}


exports.buildAuthContext = () => {

    const auth = {
        authenticate: (userData) => {
            return authenticateUserData(userData);
        }
    }
    return auth;
}