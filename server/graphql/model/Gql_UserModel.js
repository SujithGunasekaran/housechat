

class UserModel {

    constructor(model) {
        this.Model = model;
    }

    signIn() {
        return 'Signin...'
    };

    signUp() {
        return 'Signup.....'
    };

    signOut() {
        return 'Signout....'
    };
}

module.exports = UserModel;