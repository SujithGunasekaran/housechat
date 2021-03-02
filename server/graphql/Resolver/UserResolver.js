exports.userMutations = {
    signIn: (root, args, context) => {
        return context.models.UserModel.signIn();
    },
    signUp: async (root, { input }, context) => {
        const createdUser = await context.models.UserModel.signUp(input);
        return createdUser._id;
    },
    signOut: (root, args, context) => {
        return context.models.UserModel.signOut();
    }
}