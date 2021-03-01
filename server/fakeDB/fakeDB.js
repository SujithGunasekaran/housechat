const { Portfolio } = require('./data');
const Portfolios = require('../database/model/portfolioModel');
class fakeDB {

    async cleanData() {
        await Portfolios.deleteMany({});
    }

    async addData() {
        await Portfolios.create(Portfolio);
    }

    async populate() {
        await this.cleanData();
        await this.addData();
    }

}

module.exports = new fakeDB();