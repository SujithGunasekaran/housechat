import { useMutation, useQuery, useLazyQuery } from '@apollo/client';
import {
    GET_PORTFOLIOS,
    CREATE_PORTFOLIO,
    UPDATE_PORTFOLIO,
    DELETE_PORTFOLIO,
    GET_PORTFOLIOBYID,
    SIGNUP,
    SIGN_IN,
    GET_USER,
    SIGN_OUT,
    GET_USERPORTFOLIO,
    GET_FORUM_CATEGORY,
    GET_TOPICS_BY_CATEGORY,
    CREATE_TOPIC,
    GET_TOPIC_BY_SLUG
} from '../queries';

export const useGetPortfolioById = (id) => useQuery(GET_PORTFOLIOBYID, { variables: { id: id } });

export const useGetPortfolios = () => useQuery(GET_PORTFOLIOS);

export const useUpdatePortfolios = () => useMutation(UPDATE_PORTFOLIO);

export const useGetUserPortfolio = () => useQuery(GET_USERPORTFOLIO)

export const useDeletePortfolios = () => useMutation(DELETE_PORTFOLIO, {
    update(cache, { data: { deletePortfolio } }) {
        const portfoliosData = cache.readQuery({ query: GET_PORTFOLIOS });
        const userPortfolioData = cache.readQuery({ query: GET_USERPORTFOLIO });
        if (portfoliosData) {
            const { portfolios } = portfoliosData;
            const newPortfolios = portfolios.filter((portfolioID) => portfolioID._id !== deletePortfolio);
            cache.writeQuery({
                query: GET_PORTFOLIOS,
                data: { portfolios: newPortfolios }
            })
        }
        if (userPortfolioData) {
            const { userPortfolio } = userPortfolioData;
            const newUserPortfolios = userPortfolio.filter((portfolioID) => portfolioID._id !== deletePortfolio);
            cache.writeQuery({
                query: GET_USERPORTFOLIO,
                data: { userPortfolio: newUserPortfolios }
            })
        }
    }
});

export const useCreatePortfolio = () => useMutation(CREATE_PORTFOLIO, {
    update(cache, { data: { createPortfolio } }) {
        const portfoliosData = cache.readQuery({ query: GET_PORTFOLIOS });
        const userPortfolioData = cache.readQuery({ query: GET_USERPORTFOLIO });
        if (userPortfolioData) {
            const { userPortfolio } = userPortfolioData;
            cache.writeQuery({
                query: GET_USERPORTFOLIO,
                data: { userPortfolio: [...userPortfolio, createPortfolio] }
            })
        }
        if (portfoliosData) {
            const { portfolios } = portfoliosData;
            cache.writeQuery({
                query: GET_PORTFOLIOS,
                data: { portfolios: [...portfolios, createPortfolio] }
            })
        }
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


/* forum Category */


export const useGetForumCategories = () => useQuery(GET_FORUM_CATEGORY);

export const useGetTopicsByCategory = (slug) => useQuery(GET_TOPICS_BY_CATEGORY, { variables: { categoryName: slug } });

export const useGetTopicBySlug = (slug) => useQuery(GET_TOPIC_BY_SLUG, { variables: { slugName: slug } });

export const useCreateTopic = () => useMutation(CREATE_TOPIC, {
    update(cache, { data: { createTopic } }) {
        const topicsByCategoryData = cache.readQuery({ query: GET_TOPICS_BY_CATEGORY, variables: { categoryName: createTopic.forumCategory.slug } })
        if (topicsByCategoryData) {
            try {
                const { topicsByCategory } = topicsByCategoryData;
                cache.writeQuery({
                    query: GET_TOPICS_BY_CATEGORY,
                    data: { topicsByCategory: [...topicsByCategory, createTopic] },
                    variables: { categoryName: createTopic.forumCategory.slug }
                })
            }
            catch (err) { }
        }
    }
});