const mongoose = require('mongoose');

// Apollo server

const { ApolloServer, gql } = require('apollo-server-express');

// Graphql Model

const PortfolioModel = require('./model/Gql_PortfolioModel');
const UserModel = require('./model/Gql_UserModel');

// Types

const { portfolioTypes } = require('./Types/PortfolioTypes');
const { userTypes } = require('./Types/UserTypes');

// Resolver

const { portfolioQuerys, portfolioMutations } = require('./Resolver/PortfolioResolver');
const { userMutations, userQueries } = require('./Resolver/UserResolver');

// graphql context

const { buildAuthContext } = require('./context/AuthContext');

exports.createApolloServer = () => {

    // We need to construct typeDefinition. Is same as schema in graphql but in Apollo typedefs.

    const typeDefs = gql(`

        ${portfolioTypes}
        ${userTypes}

        type Query{
            portfolio(id : ID) : Portfolio,
            portfolios : [Portfolio]
            userPortfolio : [Portfolio]
            user : User
        }

        type Mutation{
            createPortfolio(input : portfolioInput) : Portfolio,
            updatePortfolio(id : ID, input : portfolioInput) : Portfolio,
            deletePortfolio(id : ID) : ID

            signIn(input : signInInput) : User,
            signUp(input : signUpInput) : String,
            signOut : Boolean
        }
    `);

    // Apollo Resolver Query is used to manage query Resolver, Mutation is used to manage create, update, delete like this

    const resolvers = {
        Query: {
            ...portfolioQuerys,
            ...userQueries
        },
        Mutation: {
            ...portfolioMutations,
            ...userMutations
        }
    }

    // To Setting up an apollo server

    const apolloServer = new ApolloServer({
        typeDefs, resolvers,
        context: ({ req }) => ({
            ...buildAuthContext(req),
            models: {
                PortfolioModel: new PortfolioModel(mongoose.model('portfolio'), req.user),
                UserModel: new UserModel(mongoose.model('User'))
            }
        })
    });

    return apolloServer;

}
