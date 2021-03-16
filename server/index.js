const express = require('express');
const next = require('next');

const port = process.env.PORT || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

//mongodb connection

const mongodb = require('./database/mongodb');
mongodb.connect();

app.prepare().then(() => {

    const server = express();

    // Initializing middleware 

    require('./middleware').initMiddleware(server, mongodb);

    // check out -> grapql index.js for ( creating apollo server ) 

    const apolloServer = require('./graphql').createApolloServer();
    apolloServer.applyMiddleware({ app: server });

    server.all('*', (req, res) => {
        return handle(req, res);
    })

    server.listen(port, err => {
        if (err) throw err;
        console.log(`> Server is listening on port ${port}`);
    })

})