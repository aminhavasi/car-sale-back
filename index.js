const http = require('http');
const express = require('express');
const app = express();
const httpServer = http.createServer(app);
require('dotenv').config();
const port = process.env.PORT || 5000;
httpServer.listen(port, () => {
    console.log(`server is running on port ${port}`);
});
