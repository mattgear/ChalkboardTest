const { GraphQLList } = require('graphql');
const db = require('../db/index');
const ContactType = require('./ContactType');

const ContactQuery = {
  contactList: {
    type: GraphQLList(ContactType),
    args: {},
    resolve(_, args) {
      return db
        .query('SELECT * FROM chalkboard.contacts')
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
