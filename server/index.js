const express = require('express');
const expressConfig = require('./config/expressConfig');
const databaseConfig = require('./config/database');

async function start() {
    const app = express();

    await databaseConfig();
    expressConfig(app);


    app.listen(3000, () => console.log('server listening on port 3000'));
}

start();