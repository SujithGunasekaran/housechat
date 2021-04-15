
const BaseModel = require('./Gql_BaseMode');


class UserFollowingModel extends BaseModel {

    async getUserFollowingList() {
        if (this.user) {
            const followingCount = await this.Model.countDocuments({ userId: this.user._id });
            const userData = await this.Model.find({ userId: this.user._id }).populate('userFollowingId');
            return { userData, followingCount };
        }
        return null;
    }

}

module.exports = UserFollowingModel;
