const passport = require('passport');

const authenticateUserData = (req, userData) => {

    return new Promise((resolve, reject) => {

        const done = (error, user) => {
            if (error) {
                return reject(new Error(error))
            }
            if (user) {
                req.login(user, (error) => {
                    if (error) { return reject(new Error(error)); }
                    return resolve(user);
                })
            } else {
                return reject(new Error('Invalid Password or Email'));
            }
        }

        const authenticateData = passport.authenticate('graphql', userData, done)
        authenticateData();
    })

}


exports.buildAuthContext = (req) => {

    const auth = {
        authenticate: (userData) => {
            return authenticateUserData(req, userData);
        },
        logout: () => req.logout()
    }
    return auth;
}