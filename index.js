const http = require('http');
const express = require('express');
const app = express();
const httpServer = http.createServer(app);
const graphqlHTTP = require('express-graphql');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
mongoose.connect(process.env.URI, {
    useCreateIndex: true,
    useFindAndModify: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
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
