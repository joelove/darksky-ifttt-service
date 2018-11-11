import bodyParser from 'body-parser';
import express from 'express';

import logger from './services/logger';
import pollingService from './services/polling-service';

import defaultRoute from './routes/default';

const appName = 'IFTTT Service';
const app = express();
const port = process.env.PORT || 443;

app.use(bodyParser.json());

app.get('/', defaultRoute);

if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => {
    logger.info(`${appName} listening on port ${port}...`);
  });
}

pollingService.start();

export default app;
