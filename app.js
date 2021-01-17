const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { GraphQLObjectType, GraphQLSchema } = require('graphql');
const ContactQuery = require('./contacts/ContactQuery');

const RootQuery = new GraphQLObjectType({
  name: 'RootQuery',
  fields: () => ({
    ...ContactQuery,
  }),
});

const schema = new GraphQLSchema({
  query: RootQuery,
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
