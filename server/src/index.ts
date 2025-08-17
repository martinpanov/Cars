import 'dotenv/config';

import express from 'express';

import databaseConfig from './config/database';
import expressConfig from './config/expressConfig';

async function start() {
  const app = express();

  await databaseConfig();
  expressConfig(app);

  app.listen(3003, () => console.log('server listening on port 3003'));
}

start();