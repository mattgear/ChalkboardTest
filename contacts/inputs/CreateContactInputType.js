const {
  GraphQLInputObjectType,
  GraphQLNonNull,
  GraphQLString,
} = require('graphql');

const CreateContactInputType = new GraphQLInputObjectType({
  name: 'CreateContactInput',
  fields: () => ({
    name: {
      type: GraphQLNonNull(GraphQLString),
    },
    phone_work: {
      type: GraphQLString,
    },
    phone_home: {
      type: GraphQLString,
    },
    phone_mobile: {
      type: GraphQLString,
    },
    phone_other: {
      type: GraphQLString,
    },
    email_address: {
      type: GraphQLNonNull(GraphQLString),
    },
    mailing_address: {
      type: GraphQLNonNull(GraphQLString),
    },
  }),
});

module.exports = CreateContactInputType;
