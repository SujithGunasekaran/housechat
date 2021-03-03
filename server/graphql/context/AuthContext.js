
const authenticateUserData = ({ email, password }) => {
    console.log(`User data : ${email}`);
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