import { expect } from 'chai';
import supertest from 'supertest';

import app from '../setup';
import Minute from '../../app/models/Minute';

const server = supertest(app.listen());

context('GET /', () => {
  let request;

  beforeEach(() => {
    request = server.get('/ifttt/v1/triggers/rain');
  });

  it('responds with 200 OK', (done) => {
    request.send().expect(200, done);
  });

  it('responds with "Hello World!"', (done) => {
    request.send().end((error, response) => {
      expect(response.text).to.equal('Hello world!');
      done();
    });
  });

  it('increments the minute count in the database', (done) => {
    request.send().end(() => {
      Minute.forge().fetch().then((minute) => {
        expect(minute.attributes.precipIntensity).to.equal('1.00');
        done();
      }).catch(done);
    });
  });
});
