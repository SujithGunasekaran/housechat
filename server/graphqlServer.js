const express = require('express');
const next = require('next');
const { buildSchema } = require('graphql');
const { graphqlHTTP } = require('express-graphql');

const port = process.env.PORT || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();


app.prepare().then(() => {

    const server = express();

    // We need to construct schema using Graphql schema language

    // buildSchema for graphql

    const schema = buildSchema(`

        type Query{
            hello : String
        }

    `)

    // root provide resolver for each API end point
    // -> Whenever I receive a query from client as a request.
    // -> Now hello is the query. we need to resolve this query with hello like below

    const root = {
        hello: () => {
            return "Hello Welcome to Graphql";
        }
    }

    server.use('/graphql', graphqlHTTP({
        schema: schema, // Graphql Schema
        rootValue: root, // Graphql Query resolver
        graphiql: true // Graphql Dev Tool.when we go to localhost:3000/graphql Graphql developer tool will open we can test our schema.
    }))

    server.all('*', (req, res) => {
        return handle(req, res);
    })

    server.listen(port, err => {
        if (err) throw err;
        console.log(`Server is running on PORT ${port}`)
    })

})