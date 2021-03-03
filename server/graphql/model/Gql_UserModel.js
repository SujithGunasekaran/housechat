

class UserModel {

    constructor(model) {
        this.Model = model;
    }

    async signIn(signInData, context) {
        try {
            const user = await context.authenticate(signInData);
            return `Userdata : ${user.username}`;
        }
        catch (err) {
            return err;
        }
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