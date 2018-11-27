import Knex from 'knex';
import bookshelf from 'bookshelf';
import upsert from 'bookshelf-upsert';
import uuid from 'bookshelf-uuid';
import config from '../knexfile';

export const connection = new Knex(config[process.env.NODE_ENV]);

const Bookshelf = bookshelf(connection);

Bookshelf.plugin('registry');
Bookshelf.plugin('virtuals');
Bookshelf.plugin(upsert);
Bookshelf.plugin(uuid);

export default Bookshelf;
