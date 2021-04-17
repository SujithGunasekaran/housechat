
const BaseModel = require('./Gql_BaseMode');


class UserFollowingModel extends BaseModel {

    async _getUserInfoData() {
        const followingCount = await this.Model.countDocuments({ userInfo: this.user._id });
        const followersCount = await this.Model.countDocuments({ userFollowingInfo: this.user._id });
        const userFollowingData = await this.Model.find({ userInfo: this.user._id }).populate('userFollowingInfo');
        const userFollowersData = await this.Model.find({ userFollowingInfo: this.user._id }).populate('userInfo');
        return { userFollowingData, userFollowersData, followingCount, followersCount };
    }

    async getUserFollowingList() {
        if (this.user) {
            const userInfoData = await this._getUserInfoData();
            return userInfoData;
        }
        return null;
    }

    async createUserFollowingData({ userInfo, userFollowingInfo }) {
        if (this.user) {
            await this.Model.create({ userInfo, userFollowingInfo });
            const userInfoData = await this._getUserInfoData();
            return userInfoData;
        }
        return null;
    }

}

module.exports = UserFollowingModel;
