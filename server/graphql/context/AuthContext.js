const passport = require('passport');

const authenticateUserData = (userData) => {

    return new Promise((resolve, reject) => {

        const done = (error, user) => {
            if (error) {
                return reject(new Error(error))
            }
            if (user) {
                return resolve(user);
            } else {
                return reject(new Error('Invalid Password or Email'));
            }
        }

        const authenticateData = passport.authenticate('graphql', userData, done)
        authenticateData();
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