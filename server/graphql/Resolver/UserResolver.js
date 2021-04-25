exports.userQueries = {
    user: (root, args, context) => {
        return context.models.UserModel.getAuthUser(context);
    },
    getUserInfo: (root, { userId }, context) => {
        return context.models.UserFollowingModel.getUserData(userId, context);
    },
    getUserFollowing: (root, { userId }, context) => {
        return context.models.UserFollowingModel.getUserFollowingList(userId);
    },
    getUserFollowers: (root, { userId }, context) => {
        return context.models.UserFollowingModel.getUserFollowersList(userId);
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
    updateUser: (root, { userId, input }, context) => {
        return context.models.UserModel.updateUserData(userId, input);
    },
    followUser: (root, { input }, context) => {
        return context.models.UserFollowingModel.createUserFollowingData(input);
    },
    deleteUserFollowing: (root, { input }, context) => {
        return context.models.UserFollowingModel.deleteUserFollowing(input);
    }
}
