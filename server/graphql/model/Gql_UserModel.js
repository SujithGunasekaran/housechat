
const BaseModel = require('./Gql_BaseMode');
class UserModel extends BaseModel {

    getAuthUser(context) {
        if (context.isAuthenticated()) {
            return context.getUser();
        }
        return null;
    }

    // method will call from userFollowing graphql    
    async getUserInfo(userId) {
        return await this.Model.findOne({ _id: userId })
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
        let emptyDataErrorMessage = '';
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

    async updateUserData(userId, input) {
        let data = ['username', 'email', 'name'];
        let emptyDataErrorMessage = [];
        try {
            const updatedUserInfo = await this.Model.findOneAndUpdate({ _id: userId }, { $set: { ...input } }, { new: true, runValidators: true });
            return updatedUserInfo;
        }
        catch (err) {
            data.map((fieldName) => {
                if (err.message.includes(fieldName)) {
                    emptyDataErrorMessage.push(fieldName);
                }
            })
            if (emptyDataErrorMessage) throw new Error(`Please Enter ${emptyDataErrorMessage.join(', ')}`)
            return null;
        }
    }
}

module.exports = UserModel;
