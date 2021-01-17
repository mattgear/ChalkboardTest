const request = require('supertest');
const app = require('../app');
const db = require('../db/index');

describe('TokenQuery', () => {
  afterAll(db.$pool.end);

  it('Returns a token', async (done) => {
    const req = request(app).get('/graphql').send({
      query: `
        query {
          token
        }
      `,
    });

    const res = await req;
    expect(res.statusCode).toBe(200);
    expect(typeof res.text).toBe('string');
    done();
  });
});
