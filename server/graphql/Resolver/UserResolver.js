exports.userQueries = {
    user: (root, args, context) => {
        return context.models.UserModel.getAuthUser(context);
    },
    getUserInfo: (root, { userId }, context) => {
        return context.models.UserFollowingModel.getUserData(userId, context);
    },
    getUserFollowing: (root, { userId }, context) => {
        return context.models.UserFollowingModel.getUserFollowingList(userId);
    }
}


exports.userMutations = {
    signIn: (root, { input }, context) => {
        return context.models.UserModel.signIn(input, context);
    },
    signUp: async (root, { input }, context) => {
        const createdUser = await context.models.UserModel.signUp(input);
        return createdUser._id;
    },
    signOut: (root, args, context) => {
        return context.models.UserModel.signOut(context);
    },
    createUserFollowing: (root, { input }, context) => {
        return context.models.UserFollowingModel.createUserFollowingData(input);
    }
}
