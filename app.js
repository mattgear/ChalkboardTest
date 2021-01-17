const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { GraphQLObjectType, GraphQLSchema } = require('graphql');
const ContactQuery = require('./contacts/ContactQuery');
const TokenQuery = require('./auth/TokenQuery');
const ContactMutation = require('./contacts/ContactMutation');

const RootQuery = new GraphQLObjectType({
  name: 'RootQuery',
  fields: () => ({
    ...ContactQuery,
    ...TokenQuery,
  }),
});

const RootMutation = new GraphQLObjectType({
  name: 'RootMutation',
  fields: () => ({
    ...ContactMutation,
  }),
});

const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: RootMutation,
});

const app = express();
app.use(
  '/graphql',
  graphqlHTTP({
    schema: schema,
    rootValue: global,
    graphiql: true,
  })
);

module.exports = app;
