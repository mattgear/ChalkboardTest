const { GraphQLInputObjectType, GraphQLEnumType } = require('graphql');

const SortValuesEnum = new GraphQLEnumType({
  name: 'SortValuesEnum',
  values: {
    NAME: {
      value: 'NAME',
    },
  },
});

const SortEnum = new GraphQLEnumType({
  name: 'SortEnum',
  values: {
    ASC: {
      value: 'ASC',
    },
    DESC: {
      value: 'DESC',
    },
  },
});

const AddressQueryPayload = new GraphQLInputObjectType({
  name: 'AddressQueryPayload',
  fields: () => ({
    field: {
      type: SortValuesEnum,
    },
    direction: {
      type: SortEnum,
    },
  }),
});

module.exports = AddressQueryPayload;
