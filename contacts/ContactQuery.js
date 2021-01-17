const { GraphQLList, GraphQLInt } = require('graphql');
const db = require('../db/index');
const ContactType = require('./ContactType');
const AddressQueryPayload = require('./inputs/AddressQueryInputType');

const ContactQuery = {
  contactList: {
    type: GraphQLList(ContactType),
    args: {
      sort: {
        type: AddressQueryPayload,
      },
      pagination: {
        type: GraphQLInt,
      },
    },
    resolve(_, args) {
      // if sort undefined sort by name asc
      const { sort } = args;
      const field = sort.field ? sort.field : 'NAME';
      const direction = sort.direction ? sort.direction : 'ASC';
      // if pagination undefined return all
      const pagination = args.pagination ? args.pagination : 'ALL';

      return db
        .query(
          'SELECT * FROM chalkboard.contacts ORDER BY ${field^} ${direction^} LIMIT ${pagination^}',
          {
            field,
            direction,
            pagination,
          }
        )
        .then((res) => {
          return res;
        })
        .catch((err) => {
          return 'There was an error: ', err;
        });
    },
  },
};

module.exports = ContactQuery;
