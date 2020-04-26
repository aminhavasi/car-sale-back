const http = require('http');
const express = require('express');
const app = express();
const httpServer = http.createServer(app);
const graphqlHTTP = require('express-graphql');
require('dotenv').config();
const port = process.env.PORT || 5000;
const schema = require('./src/apis/querys');
app.use(
    '/',
    graphqlHTTP({
        schema,
        graphiql: true,
    })
);
httpServer.listen(port, () => {
    console.log(`server is running on port ${port}`);
});
