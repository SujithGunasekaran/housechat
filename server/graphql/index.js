const mongoose = require('mongoose');

// Apollo server

const { ApolloServer, gql } = require('apollo-server-express');

// Graphql Model

const PortfolioModel = require('./model/Gql_PortfolioModel');
const UserModel = require('./model/Gql_UserModel');
const ForumCategory = require('./model/Gql_ForumCategory');
const ForumTopics = require('./model/Gql_ForumTopics');
const PostModel = require('./model/Gql_PostModel');
const UserFollowingModel = require('./model/Gql_UserFollowingModel');

// Types

const { portfolioTypes } = require('./Types/PortfolioTypes');
const { userTypes } = require('./Types/UserTypes');
const { forumTypes } = require('./Types/ForumCategory');

// Resolver

const { portfolioQuerys, portfolioMutations } = require('./Resolver/PortfolioResolver');
const { userMutations, userQueries } = require('./Resolver/UserResolver');
const { forumCategoryQueries, forumCategoryMutations, hightlightQueries } = require('./Resolver/ForumCategory');

// graphql context

const { buildAuthContext } = require('./context/AuthContext');

exports.createApolloServer = () => {

    // We need to construct typeDefinition. Is same as schema in graphql but in Apollo typedefs.

    const typeDefs = gql(`

        ${portfolioTypes}
        ${userTypes}
        ${forumTypes}

        type Query{
            portfolio(id : ID) : Portfolio,
            portfolios : [Portfolio]
            userPortfolio : [Portfolio]

            user : User
            getUserFollowing(userId : ID) : followingList
            getUserFollowers(userId : ID) : follwersList
            getUserInfo(userId : ID) : userInfo

            forumCategories : [ForumCategory]
            topicsByCategory(categoryName : String) : [Topics] 

            topicBySlug(slugName : String) : Topics
            postByTopic(slug : String, skipLength : Int, pageSize : Int) : paginatePost

            highlight(limit : Int) : HighlightResponse
        }

        type Mutation{
            createPortfolio(input : portfolioInput) : Portfolio,
            updatePortfolio(id : ID, input : portfolioInput) : Portfolio,
            deletePortfolio(id : ID) : ID

            createTopic(input : TopicInput) : Topics

            createPost(input : PostInput) : Post

            signIn(input : signInInput) : User,
            signUp(input : signUpInput) : String,
            signOut : Boolean

            createUserFollowing( input : followingInput ) : userFollowAndFollowingCount
        }
    `);

    // Apollo Resolver Query is used to manage query Resolver, Mutation is used to manage create, update, delete like this

    const resolvers = {
        Query: {
            ...portfolioQuerys,
            ...userQueries,
            ...forumCategoryQueries,
            ...hightlightQueries
        },
        Mutation: {
            ...portfolioMutations,
            ...userMutations,
            ...forumCategoryMutations
        }
    }

    // To Setting up an apollo server

    const apolloServer = new ApolloServer({
        typeDefs, resolvers,
        context: ({ req }) => ({
            ...buildAuthContext(req),
            models: {
                PortfolioModel: new PortfolioModel(mongoose.model('portfolio'), req.user),
                UserModel: new UserModel(mongoose.model('User'), req.user),
                UserFollowingModel: new UserFollowingModel(mongoose.model('userFollowings'), req.user),
                ForumCategory: new ForumCategory(mongoose.model('forumCategories')),
                ForumTopics: new ForumTopics(mongoose.model('topic'), req.user),
                PostModel: new PostModel(mongoose.model('post'), req.user)
            }
        })
    });

    return apolloServer;

}
