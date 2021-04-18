
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

    async _getUserFollowInfoData(userId) {
        const userFollowingData = await this.Model.find({ userInfo: userId }).populate('userFollowingInfo');
        const userFollowersData = await this.Model.find({ userFollowingInfo: userId }).populate('userInfo');
        return { userFollowingData, userFollowersData };
    }

    async getUserFollowingList(userId) {
        if (this.user) {
            const userInfoData = await this._getUserFollowInfoData(userId);
            return userInfoData;
        }
        return null;
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
