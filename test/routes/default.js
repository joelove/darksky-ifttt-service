import { expect } from 'chai';
import supertest from 'supertest';

import app from '../setup';
import Sample from '../../app/models/Sample';

const server = supertest(app.listen());

context('GET /', () => {
  let request;

  beforeEach(() => {
    request = server.get('/');
  });

  it('responds with 200 OK', (done) => {
    request.send().expect(200, done);
  });

  it('response with "Hello World!"', (done) => {
    request.send().end((error, response) => {
      expect(response.text).to.equal('Hello world!');
      done();
    });
  });

  it('increments the sample count in the database', (done) => {
    request.send().end(() => {
      Sample.forge().fetch().then((sample) => {
        expect(sample.attributes.count).to.equal(1);
        done();
      }).catch(done);
    });
  });
});
