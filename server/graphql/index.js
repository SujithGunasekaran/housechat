const mongoose = require('mongoose');

// Apollo server

const { ApolloServer, gql } = require('apollo-server-express');

// Graphql Model

const PortfolioModel = require('./model/Gql_PortfolioModel');
const UserModel = require('./model/Gql_UserModel');

// Types

const { portfolioTypes } = require('./Types/PortfolioTypes');

// Resolver

const { portfolioQuerys, portfolioMutations, userMutations } = require('./Resolver/PortfolioResolver');


exports.createApolloServer = () => {

    // We need to construct typeDefinition. Is same as schema in graphql but in Apollo typedefs.

    const typeDefs = gql`

        ${portfolioTypes}

        type Query{
            portfolio(id : ID) : Portfolio,
            portfolios : [Portfolio]
        }

        type Mutation{
            createPortfolio(input : portfolioInput) : Portfolio,
            updatePortfolio(id : ID, input : portfolioInput) : Portfolio,
            deletePortfolio(id : ID) : ID

            signIn : String,
            signUp : String,
            signOut : String
        }
    `;

    // Apollo Resolver Query is used to manage query Resolver, Mutation is used to manage create, update, delete like this

    const resolvers = {
        Query: {
            ...portfolioQuerys
        },
        Mutation: {
            ...portfolioMutations,
            ...userMutations
        }
    }

    // To Setting up an apollo server

    const apolloServer = new ApolloServer({
        typeDefs, resolvers,
        context: () => ({
            models: {
                PortfolioModel: new PortfolioModel(mongoose.model('portfolio')),
                UserModel: new UserModel(mongoose.model('User'))
            }
        })
    });

    return apolloServer;

}
