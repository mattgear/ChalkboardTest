const request = require('supertest');
const app = require('../app');
const db = require('../db/index');

const mockData =
  '{"data":{"contactList":[{"name":"Matt","phone_work":"07527244951","phone_home":null,"phone_mobile":null,"phone_other":null,"email_address":"matt@test.com","mailing_address":"16 House, Notts, NG55 5ED"}]}}';

describe('ContactQuery', () => {
  beforeAll(async () => {
    await db.multi(
      `TRUNCATE TABLE chalkboard.contacts; INSERT INTO chalkboard.contacts (name, phone_work, email_address, mailing_address) VALUES ('Matt','07527244951','matt@test.com','16 House, Notts, NG55 5ED')`
    );
  });

  afterAll(db.$pool.end);

  it('Returns contacts', async (done) => {
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
    expect(res.text).toEqual(mockData);
    done();
  });
});
