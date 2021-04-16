
const BaseModel = require('./Gql_BaseMode');


class UserFollowingModel extends BaseModel {

    async getUserFollowingList() {
        if (this.user) {
            const followingCount = await this.Model.countDocuments({ userInfo: this.user._id });
            const followersCount = await this.Model.countDocuments({ userFollowingInfo: this.user._id });
            const userFollowingData = await this.Model.find({ userInfo: this.user._id }).populate('userFollowingInfo');
            const userFollowersData = await this.Model.find({ userFollowingInfo: this.user._id }).populate('userInfo');
            return { userFollowingData, userFollowersData, followingCount, followersCount };
        }
        return null;
    }

}

module.exports = UserFollowingModel;
