import knexCleaner from 'knex-cleaner';
import Promise from 'bluebird';

import app from '../app';
import Bookshelf from '../app/database';
import seed from './seeds/seed';

const { knex } = Bookshelf;

beforeEach(() => knexCleaner
  .clean(knex)
  .then(() => seed(knex, Promise)));

export default app;
