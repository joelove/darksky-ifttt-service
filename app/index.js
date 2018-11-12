import bodyParser from 'body-parser';
import express from 'express';

import logger from './services/logger';
import pollingService from './services/polling-service';

import rainTrigger from './triggers/rain-trigger';

const appName = 'IFTTT Service';
const app = express();
const port = process.env.PORT || 443;

app.use(bodyParser.json());

app.get('/ifttt/v1/triggers/rain', rainTrigger);

if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => {
    logger.info(`${appName} listening on port ${port}...`);
  });
}

pollingService.start();

export default app;
