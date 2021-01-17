const request = require('supertest');
const app = require('../app');
const db = require('../db/index');

const mockData =
  '{"data":{"createContact":{"contact":{"name":"Tester","phone_work":"07527244951","email_address":"Tester@test.com","mailing_address":"16 House, Notts, NG55 5ED"}}}}';

describe('ContactMutation', () => {
  beforeAll(async () => {
    await db.query('TRUNCATE TABLE chalkboard.contacts');
  });

  afterAll(db.$pool.end);

  it('Creates a contact', async (done) => {
    const req = request(app).post('/graphql').send({
      query: `
        mutation {
          createContact(
            token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoidXNlciIsImlhdCI6MTYxMDkwODM0NSwiZXhwIjoxNjEwOTExOTQ1fQ.ehtmVnmECRdaEVvM6vRUR02EZsA6OnUzImUQIPzep5A"
            newContact: {
              name: "Tester"
              phone_work: "07527244951"
              email_address: "Tester@test.com"
              mailing_address: "16 House, Notts, NG55 5ED"
            }
          ) {
            contact {
              name
              phone_work
              email_address
              mailing_address
            }
          }
        }
      `,
    });

    const res = await req;
    expect(res.statusCode).toBe(200);
    expect(res.text).toEqual(mockData);

    await db.query(`DELETE FROM chalkboard.contacts WHERE name='TESTER'`);
    done();
  });
});
