const Portfolios = require('../../database/model/portfolioModel');

const data = {
    Portfolio: [
        {
            _id: "1",
            title: 'Job in Netcentric',
            company: 'Netcentric',
            companyWebsite: 'https://www.google.com',
            location: 'Spain, Barcelona',
            jobTitle: 'Engineer',
            description: 'Doing something, programing....',
            startDate: '01/01/2014',
            endDate: '01/01/2016'
        },
        {
            _id: "2",
            title: 'Job in Siemens',
            company: 'Siemens',
            companyWebsite: 'https://www.google.com',
            location: 'Slovakia, Kosice',
            jobTitle: 'Software Engineer',
            description: 'Responsible for parsing framework for JSON medical data.',
            startDate: '01/01/2011',
            endDate: '01/01/2013'
        },
        {
            _id: "3",
            title: 'Work in USA',
            company: 'WhoKnows',
            companyWebsite: 'https://www.google.com',
            location: 'USA, Montana',
            jobTitle: 'Full Stack Developer',
            description: 'Building Responsive and Configurable Website',
            startDate: '01/01/2010',
            endDate: '01/01/2011'
        }
    ]
}


exports.portfolioQuerys = {
    portfolio: (root, { id }) => {
        return Portfolios.findById(id);
    },
    portfolios: () => {
        return Portfolios.find({});
    }
}

exports.portfolioMutations = {
    createPortfolio: async (root, { input }) => {
        const createdPortfolios = await Portfolios.create(input);
        return createdPortfolios;
    },
    updatePortfolio: async (root, { id, input }) => {
        const updatedPortfolio = await Portfolios.findOneAndUpdate({ _id: id }, input, { new: true });
        return updatedPortfolio;
    },
    deletePortfolio: async (root, { id }) => {
        const deletedPortfolio = await Portfolios.findOneAndRemove({ _id: id });
        return deletedPortfolio._id;
    }
}