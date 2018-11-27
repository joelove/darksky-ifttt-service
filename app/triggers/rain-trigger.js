import Minute from '../models/Minute';

export default (req, res) => {
  Minute
    .query()
    .where('id', 'de305d54-75b4-431b-adb2-eb6b9e546014')
    .increment('precipIntensity', 1)
    .then(() => {
      res.send('Hello world!');
    });
};
