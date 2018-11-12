import uuid from 'node-uuid';

export default Factory => Factory
  .define('minute')
  .attr('id', () => uuid.v4());
