const http = require('http');
const express = require('express');
const app = express();
const httpServer = http.createServer(app);
const graphqlHTTP = require('express-graphql');
const cors = require('cors');

require('dotenv').config();

app.use(cors());
const port = process.env.PORT || 5000;
const schema = require('./src/apis/querys');
app.use(
    '/graphQl',
    graphqlHTTP({
        schema,
        graphiql: true,
    })
);
httpServer.listen(port, () => {
    console.log(`server is running on port ${port}`);
});
