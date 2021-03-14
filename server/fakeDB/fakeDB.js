const { Portfolios, Users, forumCategories } = require('./data');
const Portfolio = require('../database/model/DB_portfolioModel');
const User = require('../database/model/DB_userModel');
const ForumCategory = require('../database/model/DB_forumCategory');
class fakeDB {

    async cleanData() {
        await User.deleteMany({});
        await Portfolio.deleteMany({});
        await ForumCategory.deleteMany({});
    }

    async addData() {
        await User.create(Users);
        await Portfolio.create(Portfolios);
        await ForumCategory.create(forumCategories);
    }

    async populate() {
        await this.cleanData();
        await this.addData();
    }

}

module.exports = new fakeDB();