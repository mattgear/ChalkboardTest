const { GraphQLString } = require('graphql');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const TokenQuery = {
  token: {
    type: GraphQLString,
    resolve(_, __) {
      const token = jwt.sign({ data: 'user' }, process.env.JWT_SECRET, {
        expiresIn: '1h',
      });
      return token;
    },
  },
};

module.exports = TokenQuery;
