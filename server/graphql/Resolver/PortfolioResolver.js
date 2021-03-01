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
    createPortfolio: (root, { input }) => {
        const _id = require('crypto').randomBytes(10).toString('hex');
        const newPortfolio = { ...input };
        newPortfolio._id = _id;
        data.Portfolio = [...data.Portfolio, newPortfolio];
        return newPortfolio;
    },
    updatePortfolio: (root, { id, input }) => {
        const index = data.Portfolio.findIndex((portfolioID) => portfolioID._id === id)
        const oldPortfolio = data.Portfolio[index];
        const updatedPortfolio = { ...oldPortfolio, ...input };
        data.Portfolio[index] = updatedPortfolio;
        return updatedPortfolio;
    },
    deletePortfolio: (root, { id }) => {
        let index = data.Portfolio.findIndex((portfolioData) => portfolioData._id === id);
        data.Portfolio.splice(index, 1);
        return id;
    }
}