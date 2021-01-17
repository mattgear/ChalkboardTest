const { GraphQLObjectType, GraphQLString } = require('graphql');

const ContactType = new GraphQLObjectType({
  name: 'ContactType',
  fields: () => ({
    name: { type: GraphQLString },
    phone_work: { type: GraphQLString },
    phone_home: { type: GraphQLString },
    phone_mobile: { type: GraphQLString },
    phone_other: { type: GraphQLString },
    email_address: { type: GraphQLString },
    mailing_address: { type: GraphQLString },
  }),
});

module.exports = ContactType;
