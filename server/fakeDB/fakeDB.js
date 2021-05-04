const { Users, forumCategories, topics, posts, UserFollowing } = require('./data');
const User = require('../database/model/DB_userModel');
const ForumCategory = require('../database/model/DB_forumCategory');
const Topics = require('../database/model/DB_topic');
const Post = require('../database/model/DB_postModel');
const UserFollowings = require('../database/model/DB_userFollowingModel');

class fakeDB {

    async cleanData() {
        await User.deleteMany({});
        await ForumCategory.deleteMany({});
        await Topics.deleteMany({});
        await Post.deleteMany({});
        await UserFollowings.deleteMany({});
    }

    async addData() {
        await User.create(Users);
        await ForumCategory.create(forumCategories);
        await Topics.create(topics);
        await Post.create(posts);
        await UserFollowings.create(UserFollowing);
    }

    async populate() {
        await this.cleanData();
        await this.addData();
    }

}

module.exports = new fakeDB();
