import uuid from 'node-uuid';

export default Factory => Factory
  .define('sample')
  .attr('id', () => uuid.v4());
