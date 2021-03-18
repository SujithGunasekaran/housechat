const { Portfolios, Users, forumCategories, topics, posts } = require('./data');
const Portfolio = require('../database/model/DB_portfolioModel');
const User = require('../database/model/DB_userModel');
const ForumCategory = require('../database/model/DB_forumCategory');
const Topics = require('../database/model/DB_topic');
const Post = require('../database/model/DB_postModel');
class fakeDB {

    async cleanData() {
        await User.deleteMany({});
        await Portfolio.deleteMany({});
        await ForumCategory.deleteMany({});
        await Topics.deleteMany({});
        await Post.deleteMany({});
    }

    async addData() {
        await User.create(Users);
        await Portfolio.create(Portfolios);
        await ForumCategory.create(forumCategories);
        await Topics.create(topics);
        await Post.create(posts);
    }

    async populate() {
        await this.cleanData();
        await this.addData();
    }

}

module.exports = new fakeDB();