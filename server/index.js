const express = require('express');
const next = require('next');
const cors = require('cors');

const port = process.env.PORT || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

//mongodb connection

const mongodb = require('./database/mongodb');
mongodb.connect();

app.prepare().then(() => {

    const server = express();

    // let corsOptions = {
    //     origin: process.env.DOMAIN,
    //     credentials: true
    // };

    // server.use(cors(corsOptions));

    // Initializing middleware 

    require('./middleware').initMiddleware(server, mongodb);

    // check out -> grapql index.js for ( creating apollo server ) 

    const apolloServer = require('./graphql').createApolloServer();
    apolloServer.applyMiddleware({
        app: server,
        cors: { credentials: true, origin: `${process.env.DOMAIN}` }
    });

    server.all('*', (req, res) => {
        return handle(req, res);
    })

    server.listen(port, err => {
        if (err) throw err;
        console.log(`> Server is listening on port ${port}`);
    })

})
