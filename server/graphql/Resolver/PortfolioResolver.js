
exports.portfolioQuerys = {
    portfolio: (root, { id }, context) => {
        return context.models.PortfolioModel.getById(id);
    },
    portfolios: (root, args, context) => {
        return context.models.PortfolioModel.getAll();
    },
    userPortfolio: async (root, args, context) => {
        return await context.models.PortfolioModel.getAllByUser();
    }
}

exports.portfolioMutations = {
    createPortfolio: async (root, { input }, context) => {
        const createdPortfolios = await context.models.PortfolioModel.create(input);
        return createdPortfolios;
    },
    updatePortfolio: async (root, { id, input }, context) => {
        const updatedPortfolio = await context.models.PortfolioModel.findAndUpdate(id, input);
        return updatedPortfolio;
    },
    deletePortfolio: async (root, { id }, context) => {
        const deletedPortfolio = await context.models.PortfolioModel.findAndDelete(id);
        return deletedPortfolio._id;
    }
}