import Bookshelf from '../database';

const Minute = Bookshelf.Model.extend({
  tableName: 'minutes',
  virtuals: {
    __type: () => 'Minute',
  },
});

export default Bookshelf.model('Minute', Minute);
