const { GraphQLNonNull, GraphQLString } = require('graphql');
const db = require('../db');
const CreateContactPayload = require('./payloads/CreateContactPayload');
const CreateContactInputType = require('./inputs/CreateContactInputType');
const tokenAuthentication = require('../auth/TokenAuthentication');

const ContactMutation = {
  createContact: {
    type: CreateContactPayload,
    args: {
      token: {
        type: GraphQLNonNull(GraphQLString),
      },
      newContact: {
        type: GraphQLNonNull(CreateContactInputType),
      },
    },
    resolve: async (_, args) => {
      const { token, newContact } = args;
      tokenAuthentication(token);

      const {
        name,
        phone_work,
        phone_home,
        phone_mobile,
        phone_other,
        email_address,
        mailing_address,
      } = newContact;

      if (!phone_work && !phone_home && !phone_mobile && !phone_other) {
        throw Error('Please enter at least one phone number');
      }

      const query = {
        text: `INSERT INTO chalkboard.contacts VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
        values: [
          name,
          phone_work,
          phone_home,
          phone_mobile,
          phone_other,
          email_address,
          mailing_address,
        ],
      };

      const insertContact = await db
        .query(query)
        .then((res) => {
          return res;
        })
        .catch((err) => {
          if (err.code === '23505') {
            throw Error('Name and or email address already registered');
          }
          return 'There was an error: ', err;
        });

      return { contact: insertContact[0] };
    },
  },
};

module.exports = ContactMutation;
