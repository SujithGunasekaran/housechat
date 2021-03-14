const { Portfolios, Users, forumCategories, topics } = require('./data');
const Portfolio = require('../database/model/DB_portfolioModel');
const User = require('../database/model/DB_userModel');
const ForumCategory = require('../database/model/DB_forumCategory');
const Topics = require('../database/model/DB_topic');
class fakeDB {

    async cleanData() {
        await User.deleteMany({});
        await Portfolio.deleteMany({});
        await ForumCategory.deleteMany({});
        await Topics.deleteMany({});
    }

    async addData() {
        await User.create(Users);
        await Portfolio.create(Portfolios);
        await ForumCategory.create(forumCategories);
        await Topics.create(topics);
    }

    async populate() {
        await this.cleanData();
        await this.addData();
    }

}

module.exports = new fakeDB();