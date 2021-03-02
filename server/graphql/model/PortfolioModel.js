

class PortfolioModel {

    constructor(model) {

        // this.Model === portfolio 
        // portfolio is a mongodb model
        this.Model = model;
    }

    getAll() {
        return this.Model.find({});
    };

    getById(portfolioID) {
        return this.Model.findById(portfolioID);
    };

    create(portfolioData) {
        return this.Model.create(portfolioData);
    };

    findAndUpdate(portfolioID, portfolioData) {
        return this.Model.findOneAndUpdate({ _id: portfolioID }, portfolioData, { new: true });
    };

    findAndDelete(portfolioID) {
        return this.Model.findOneAndRemove({ _id: portfolioID })
    };

}

module.exports = PortfolioModel;