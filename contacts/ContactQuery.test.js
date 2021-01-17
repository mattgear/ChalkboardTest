const request = require('supertest');
const app = require('../app');
const db = require('../db/index');

describe('AddressQuery', () => {
  afterAll(db.$pool.end);

  it('Returns addresses', async (done) => {
    const req = request(app).get('/graphql').send({
      query: `
        query {
          contactList {
            name
            phone_work
            phone_home
            phone_mobile
            phone_other
            email_address
            mailing_address
          }
        }
      `,
    });

    const res = await req;
    expect(res.statusCode).toBe(200);
    expect(res.text).toEqual('{"data":{"contactList":[]}}');
    done();
  });
});
