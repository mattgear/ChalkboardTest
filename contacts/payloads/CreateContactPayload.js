const { GraphQLObjectType } = require('graphql');
const ContactType = require('../ContactType');

const CreateContactPayload = new GraphQLObjectType({
  name: 'CreateContactPayload',
  fields: () => ({
    contact: {
      type: ContactType,
    },
  }),
});

module.exports = CreateContactPayload;
