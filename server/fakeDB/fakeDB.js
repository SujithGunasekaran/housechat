const { Portfolios, Users } = require('./data');
const Portfolio = require('../database/model/DB_portfolioModel');
const User = require('../database/model/DB_userModel');
class fakeDB {

    async cleanData() {
        await User.deleteMany({});
        await Portfolio.deleteMany({});
    }

    async addData() {
        await User.create(Users);
        await Portfolio.create(Portfolios);
    }

    async populate() {
        await this.cleanData();
        await this.addData();
    }

}

module.exports = new fakeDB();