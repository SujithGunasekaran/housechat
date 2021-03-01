const express = require('express');
const next = require('next');

// Apollo server

const { ApolloServer, gql } = require('apollo-server-express');

const port = process.env.PORT || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

// Types

const { portfolioTypes } = require('./graphql/Types/PortfolioTypes');

// Resolver

const { portfolioQuerys, portfolioMutations } = require('./graphql/Resolver/PortfolioResolver');

//mongodb connection

const mongodb = require('./database/mongodb');
mongodb.connect();


app.prepare().then(() => {

    const server = express();

    // We need to construct typeDefinition. Is same as schema in graphql but in Apollo typedefs.

    const typeDefs = gql`

        ${portfolioTypes}

        type Query{
            hello : String,
            portfolio(id : ID) : Portfolio,
            portfolios : [Portfolio]
        }

        type Mutation{
            createPortfolio(input : portfolioInput) : Portfolio,
            updatePortfolio(id : ID, input : portfolioInput) : Portfolio,
            deletePortfolio(id : ID) : ID
        }
    `;

    // Apollo Resolver Query is used to manage query Resolver, Mutation is used to manage create, update, delete like this

    const resolvers = {
        Query: {
            ...portfolioQuerys
        },
        Mutation: {
            ...portfolioMutations
        }
    }

    // To Setting up an apollo server

    const apolloServer = new ApolloServer({ typeDefs, resolvers });
    apolloServer.applyMiddleware({ app: server });

    server.all('*', (req, res) => {
        return handle(req, res);
    })

    server.listen(port, err => {
        if (err) throw err;
        console.log(`> Server is listening on port ${port}`);
    })

})