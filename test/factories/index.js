/* eslint-disable global-require, import/no-dynamic-require */
import { find } from 'globule';
import { Factory } from 'rosie';

const prefix = './';
const patterns = ['**/*', '!index.js'];
const srcBase = 'test/factories';

find(patterns, { srcBase }).forEach((module) => {
  require(prefix + module).default(Factory);
});

export default Factory;
