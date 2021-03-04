

class UserModel {

    constructor(model) {
        this.Model = model;
    }

    async signIn(signInData, context) {
        try {
            const user = await context.authenticate(signInData);
            return user;
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

    signOut(context) {
        try {
            // console.log("Before logout --------")
            // console.log("Is Authenticated", context.isAuthenticated())
            // console.log("user", context.getUser())
            context.logout();
            // console.log("After logout --------")
            // console.log("Is Authenticated", context.isAuthenticated())
            // console.log("user", context.getUser())
            return true;
        }
        catch (err) {
            return false;
        }
    };
}

module.exports = UserModel;