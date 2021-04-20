
const BaseModel = require('./Gql_BaseMode');


class UserFollowingModel extends BaseModel {

    async _getUserFollowingAndFollowersCount(userId) {
        const followingCount = await this.Model.countDocuments({ userInfo: userId });
        const followersCount = await this.Model.countDocuments({ userFollowingInfo: userId });
        return { followersCount, followingCount };
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
            await this.Model.create({ userInfo, userFollowingInfo });
            const userInfoData = await this._getUserFollowingAndFollowersCount(userInfo);
            return userInfoData;
        }
        return null;
    }

}

module.exports = UserFollowingModel;
