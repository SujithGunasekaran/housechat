

class UserModel {

    constructor(model) {
        this.Model = model;
    }

    signIn(signUpData) {
        return 'Signin...'
    };

    signUp(signUpData) {
        if (signUpData.password !== signUpData.passwordConfirmation) {
            throw new Error('Password must be same as passwordConfirmation');
        }
        return this.Model.create(signUpData);
    };

    signOut() {
        return 'Signout....'
    };
}

module.exports = UserModel;