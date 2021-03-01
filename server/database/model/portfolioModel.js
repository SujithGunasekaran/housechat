const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const portfolioSchema = new Schema({
    title: { type: String, required: true },
    company: { type: String, required: true },
    companyWebsite: { type: String, required: true },
    location: { type: String, required: true },
    jobTitle: { type: String, required: true },
    description: { type: String, required: true },
    startDate: { type: Date },
    endDate: { type: Date },
    createdAt: { type: Date, default: Date.now }
})

const Portfolios = mongoose.model('portfolio', portfolioSchema);
module.exports = Portfolios;