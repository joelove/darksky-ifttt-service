export default (knex, Promise) => Promise.all([
  knex('minutes').insert({
    id: 'de305d54-75b4-431b-adb2-eb6b9e546014',
    time: 1542021756,
    precipIntensity: 0,
    precipProbability: 0.2,
    precipIntensityError: 0.05,
    precipType: 'rain',
  }),
]);
