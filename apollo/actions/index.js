import { useMutation, useQuery, useLazyQuery } from '@apollo/client';
import { GET_PORTFOLIOS, CREATE_PORTFOLIO, UPDATE_PORTFOLIO, DELETE_PORTFOLIO, GET_PORTFOLIOBYID, SIGNUP, SIGN_IN, GET_USER, SIGN_OUT } from '../queries';

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

export const useSignup = () => useMutation(SIGNUP)

export const useSignin = () => useMutation(SIGN_IN, {
    update(cache, { data: { signIn: signInUserData } }) {
        cache.writeQuery({
            query: GET_USER,
            data: { user: { signInUserData } }
        })
    }
})

export const useSignout = () => useMutation(SIGN_OUT)

export const useLazyGetUser = () => useLazyQuery(GET_USER)

export const useGetUser = () => useQuery(GET_USER)