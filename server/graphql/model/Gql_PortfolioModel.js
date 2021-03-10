

class PortfolioModel {

    constructor(model, user) {

        // this.Model === portfolio 
        // portfolio is a mongodb model
        this.Model = model;
        this.user = user;
        this.writeAccess = ['admin', 'instructor']
    }

    getAll() {
        return this.Model.find({});
    };

    getAllByUser() {
        return this.Model.find({ user: this.user._id }).sort({ startDate: 'desc' });
    };

    getById(portfolioID) {
        return this.Model.findById(portfolioID);
    };

    create(portfolioData) {
        if (!this.user || !this.writeAccess.includes(this.user.role)) {
            throw new Error('Not Authorized!!!')
        }
        portfolioData.user = this.user;
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