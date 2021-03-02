import { useMutation, useQuery } from '@apollo/client';
import { GET_PORTFOLIOS, CREATE_PORTFOLIO, UPDATE_PORTFOLIO, DELETE_PORTFOLIO, GET_PORTFOLIOBYID } from '../queries';

export const useGetPortfolioById = (id) => useQuery(GET_PORTFOLIOBYID, { variables: { id: id } });

export const useGetPortfolios = () => useQuery(GET_PORTFOLIOS);

export const useUpdatePortfolios = () => useMutation(UPDATE_PORTFOLIO);

export const useDeletePortfolios = () => useMutation(DELETE_PORTFOLIO, {
    update(cache, { data: { deletePortfolio } }) {
        const { portfolios } = cache.readQuery({ query: GET_PORTFOLIOS });
        const newPortfolios = portfolios.filter((portfolioID) => portfolioID._id !== deletePortfolio);
        cache.writeQuery({
            query: GET_PORTFOLIOS,
            data: { portfolios: newPortfolios }
        })
    }
});

export const useCreatePortfolios = () => useMutation(CREATE_PORTFOLIO, {
    update(cache, { data: { createPortfolio } }) {
        const { portfolios } = cache.readQuery({ query: GET_PORTFOLIOS });
        cache.writeQuery({
            query: GET_PORTFOLIOS,
            data: { portfolios: [...portfolios, createPortfolio] }
        })
    }
})