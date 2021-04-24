
const BaseModel = require('./Gql_BaseMode');


class UserFollowingModel extends BaseModel {

    async _getUserFollowingAndFollowersCount(userId) {
        let showFollow = false;
        if (this.user && userId !== this.user._id) {
            const userData = await this.Model.findOne({ userInfo: this.user._id, userFollowingInfo: userId });
            if (!userData) showFollow = true;
        }
        const followingCount = await this.Model.countDocuments({ userInfo: userId });
        const followersCount = await this.Model.countDocuments({ userFollowingInfo: userId });
        return { followersCount, followingCount, showFollow };
    }

    async getUserData(userId, context) {
        const userFollowInfo = await this._getUserFollowingAndFollowersCount(userId);
        const userData = await context.models.UserModel.getUserInfo(userId);
        return { userData, ...userFollowInfo };
    }

    async _getUserFollowingInfoData(userId) {
        const userFollowingData = await this.Model.find({ userInfo: userId }).populate('userFollowingInfo');
        return { userFollowingData };
    }

    async _getUserFollowerInfoData(userId) {
        const userFollowersData = await this.Model.find({ userFollowingInfo: userId }).populate('userInfo');
        return { userFollowersData };
    }

    async getUserFollowingList(userId) {
        const userInfoData = await this._getUserFollowingInfoData(userId);
        return userInfoData;
    }

    async getUserFollowersList(userId) {
        const userInfoData = await this._getUserFollowerInfoData(userId);
        return userInfoData;
    }

    async createUserFollowingData({ userInfo, userFollowingInfo }) {
        if (this.user) {
            const checkIfUserIsFollower = await this.Model.findOne({ userInfo, userFollowingInfo });
            if (!checkIfUserIsFollower) {
                await this.Model.create({ userInfo, userFollowingInfo });
                const userData = await this.Model.findOne({ userInfo, userFollowingInfo }).populate('userInfo').populate('userFollowingInfo');
                return userData;
            }
            else {
                return null;
            }
        }
        return null;
    }

    async deleteUserFollowing({ userInfo, userFollowingInfo }) {
        const deletedUserId = await this.Model.findOneAndRemove({ userInfo, userFollowingInfo });
        return deletedUserId;
    }

}

module.exports = UserFollowingModel;
