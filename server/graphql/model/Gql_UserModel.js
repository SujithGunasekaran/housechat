
const BaseModel = require('./Gql_BaseMode');
class UserModel extends BaseModel {

    getAuthUser(context) {
        if (context.isAuthenticated()) {
            return context.getUser();
        }
        return null;
    }

    async getUserFollowingList() {
        if (this.user) {
            const userData = await this.Model.findOne({ _id: this.user._id }).populate('following');
            return userData.following;
        }
        return null;
    }

    async getUserFollowersList() {
        if (this.user) {
            const userData = await this.Model.findOne({ _id: this.user._id }).populate('followers');
            return userData.followers;
        }
        return null;
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

    async signUp(signUpData) {
        let data = ['username', 'email', 'password', 'passwordConfirmation'];
        let emptyDataErrorMessage = ''
        if (signUpData.password !== signUpData.passwordConfirmation) {
            throw new Error('Password must be same as passwordConfirmation');
        }
        try {
            return await this.Model.create(signUpData);
        }
        catch (err) {
            if (err.code === 11000) {
                throw new Error('User with provided email already exists!');
            }
            data.map((fieldName) => {
                if (err.message.includes(fieldName)) {
                    emptyDataErrorMessage += fieldName + ' ';
                }
            })
            if (emptyDataErrorMessage) throw new Error(`Please Enter ${emptyDataErrorMessage}`)
        }
    };

    signOut(context) {
        try {
            context.logout();
            return true;
        }
        catch (err) {
            return false;
        }
    };
}

module.exports = UserModel;