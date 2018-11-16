import { join, pipe, forEach } from 'ramda';
import { stringify } from 'qs';
import https from 'https';

import logger from './logger';
import Minute from '../models/Minute';

const joinByComma = join(',');
const joinBySlash = join('/');

const host = process.env.DARK_SKY_API_HOST;
const port = process.env.DARK_SKY_API_PORT;
const apiKey = process.env.DARK_SKY_API_KEY;
const latitude = process.env.DARK_SKY_LAT;
const longitude = process.env.DARK_SKY_LNG;

const endpoint = '/forecast';
const method = 'GET';
const without = ['hourly', 'daily', 'flags', 'alerts'];
const requestInterval = 60 * 1000;

const latlong = joinByComma([latitude, longitude]);
const exclude = joinByComma(without);
const query = stringify({ exclude }, { addQueryPrefix: true });
const path = joinBySlash([endpoint, apiKey, latlong, query]);

const payload = {
  host,
  port,
  path,
  method,
};

const handleFailure = () => {
  logger.error('REQUEST FAILURE', host + endpoint);
};

const storeMinute = (minute) => {
  logger.info('STORE MINUTE', minute.time);

  Minute
    .forge(minute)
    .where({ time: minute.time })
    .upsert(minute);
};

const storeMinutes = forEach(storeMinute);

const storeResult = ({ minutely }) => {
  logger.info('REQUEST SUCCESS', host + endpoint);

  storeMinutes(minutely.data);
};

const handleSuccess = pipe(JSON.parse, storeResult);

const handleRequest = (response) => {
  let content = '';

  response.on('data', (chunk) => {
    content += chunk;
  });

  response.on('end', () => {
    handleSuccess(content);
  });
};

const makeRequest = () => {
  logger.info('REQUEST BEGIN', host + endpoint);

  https
    .request(payload, handleRequest)
    .on('error', handleFailure)
    .end();
};

const start = () => {
  logger.info('BEGIN POLLING', `${host + endpoint} (every ${requestInterval / 1000} seconds)`);

  setInterval(makeRequest, requestInterval);
};

export default { start };
